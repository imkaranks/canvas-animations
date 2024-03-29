/**
 * Represents a vector in 3D space.
 */
export default class Vector {
  /**
   * Creates a Vector.
   * @param {number} [x=0] - The x coordinate of the vector.
   * @param {number} [y=0] - The y coordinate of the vector.
   * @param {number} [z=0] - The z coordinate of the vector.
   */
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  /**
   * Adds another vector to this vector.
   * @param {Vector} vector - The vector to add.
   */
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
  }

  /**
   * Subtracts another vector from this vector.
   * @param {Vector} vector - The vector to subtract.
   */
  sub(vector) {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
  }

  /**
   * Multiplies this vector component-wise by another vector.
   * @param {Vector} vector - The vector to multiply by.
   */
  mult(vector) {
    this.x *= vector.x;
    this.y *= vector.y;
    this.z *= vector.z;
  }

  /**
   * Divides this vector component-wise by another vector.
   * @param {Vector} vector - The vector to divide by.
   */
  div(vector) {
    this.x /= vector.x;
    this.y /= vector.y;
    this.z /= vector.z;
  }

  /**
   * Calculates the dot product of this vector and another vector.
   * @param {Vector} vector - The other vector.
   * @returns {number} The dot product.
   */
  dot(vector) {
    return this.x * vector.x + this.y * vector.y + this.z * vector.z;
  }

  /**
   * Calculates the cross product of this vector and another vector.
   * @param {Vector} vector - The other vector.
   * @returns {Vector} The cross product as a new vector.
   */
  cross(vector) {
    const x = this.y * vector.z - this.z * vector.y;
    const y = this.z * vector.x - this.x * vector.z;
    const z = this.x * vector.y - this.y * vector.x;
    return new Vector(x, y, z);
  }

  /**
   * Calculates the magnitude (length) of this vector.
   * @returns {number} The magnitude of the vector.
   */
  mag() {
    return Math.hypot(this.x, this.y, this.z);
  }

  /**
   * Normalizes this vector (makes its length 1).
   */
  normalize() {
    const mag = this.mag();
    if (mag !== 0) {
      this.div(mag);
    }
  }
}
