import { XdrReader } from './serialization/xdr-reader';
import { XdrWriter } from './serialization/xdr-writer';
import { XdrNotImplementedDefinitionError } from './errors';

class XdrType {

  /**
   * Encode value to XDR format
   * @param {XdrEncodingFormat} [format] - Encoding format (one of "raw", "hex", "base64")
   * @return {String|Buffer}
   */
  toXDR(format = 'raw') {
    if (!this.write)
      return this.constructor.toXDR(this, format);

    const writer = new XdrWriter();
    this.write(this, writer);
    return encodeResult(writer.finalize(), format);
  }

  /**
   * Decode XDR-encoded value
   * @param {Buffer|String} input - XDR-encoded input data
   * @param {XdrEncodingFormat} [format] - Encoding format (one of "raw", "hex", "base64")
   * @return {XdrType}
   */
  fromXDR(input, format = 'raw') {
    if (!this.read)
      return this.constructor.fromXDR(input, format);

    const reader = new XdrReader(decodeInput(input, format));
    const result = this.read(reader);
    reader.ensureInputConsumed();
    return result;
  }

  /**
   * Check whether input contains a valid XDR-encoded value
   * @param {Buffer|String} input - XDR-encoded input data
   * @param {XdrEncodingFormat} [format] - Encoding format (one of "raw", "hex", "base64")
   * @return {Boolean}
   */
  validateXDR(input, format = 'raw') {
    try {
      this.fromXDR(input, format);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Encode value to XDR format
   * @param {XdrPrimitiveType} value - Value to serialize
   * @param {XdrEncodingFormat} [format] - Encoding format (one of "raw", "hex", "base64")
   * @return {Buffer}
   */
  static toXDR(value, format = 'raw') {
    const writer = new XdrWriter();
    this.write(value, writer);
    return encodeResult(writer.finalize(), format);
  }

  /**
   * Decode XDR-encoded value
   * @param {Buffer|String} input - XDR-encoded input data
   * @param {XdrEncodingFormat} [format] - Encoding format (one of "raw", "hex", "base64")
   * @return {XdrType}
   */
  static fromXDR(input, format = 'raw') {
    const reader = new XdrReader(decodeInput(input, format));
    const result = this.read(reader);
    reader.ensureInputConsumed();
    return result;
  }

  /**
   * Check whether input contains a valid XDR-encoded value
   * @param {Buffer|String} input - XDR-encoded input data
   * @param {XdrEncodingFormat} [format] - Encoding format (one of "raw", "hex", "base64")
   * @return {Boolean}
   */
  static validateXDR(input, format = 'raw') {
    try {
      this.fromXDR(input, format);
      return true;
    } catch (e) {
      return false;
    }
  }
}

export class XdrPrimitiveType extends XdrType {
  /**
   * Read value from the XDR-serialized input
   * @param {XdrReader} reader - XdrReader instance
   * @return {*}
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  static read(reader) {
    throw new XdrNotImplementedDefinitionError()
  }

  /**
   * Write XDR value to the buffer
   * @param {*} value - Value to write
   * @param {XdrWriter} writer - XdrWriter instance
   * @return {void}
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  static write(value, writer) {
    throw new XdrNotImplementedDefinitionError()
  }

  /**
   * Check whether XDR primitive value is valid
   * @param {XdrType} value - Value to check
   * @return {Boolean}
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  static isValid(value) {
    return false;
  }
}

export class XdrCompositeType extends XdrType {
  // Every descendant should implement two methods: read(reader) and write(value, writer)

  /**
   * Check whether XDR primitive value is valid
   * @param {XdrType} value - Value to check
   * @return {Boolean}
   * @abstract
   */
  // eslint-disable-next-line no-unused-vars
  isValid(value) {
    return false;
  }
}

class InvalidXdrEncodingFormatError extends TypeError {
  constructor(format) {
    super(`Invalid format ${format}, must be one of "raw", "hex", "base64"`);
  }
}

function encodeResult(buffer, format) {
  switch (format) {
    case 'raw':
      return buffer;
    case 'hex':
      return buffer.toString('hex');
    case 'base64':
      return buffer.toString('base64');
    default:
      throw new InvalidXdrEncodingFormatError(format);
  }
}

function decodeInput(input, format) {
  switch (format) {
    case 'raw':
      return input;
    case 'hex':
      return Buffer.from(input, 'hex');
    case 'base64':
      return Buffer.from(input, 'base64');
    default:
      throw new InvalidXdrEncodingFormatError(format);
  }
}

/**
 * @typedef {'raw'|'hex'|'base64'} XdrEncodingFormat
 */
