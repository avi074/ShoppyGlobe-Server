/**
 * Enum of Roles for user access control
 */
export const Roles = Object.freeze({
  BUYER: "buyer",
  ADMIN: "admin",
  SUPERADMIN: "superAdmin",

  /**
   * Checks whether user is buyer or not
   * @param {string} role 
   * @returns {Boolean}
   */
  isBuyer(role) {
    return role == this.BUYER
  },
  
  /**
   * Checks whether user is in administrator team or not
   * @param {string} role 
   * @returns {Boolean}
   */
  isAdministrator(role) {
    return role == this.ADMIN || role == this.SUPERADMIN
  },

  /**
   * returns all role type
   * @returns {string[]}
   */
  getAllRoles() {
    return [this.BUYER, this.ADMIN, this.SUPERADMIN]
  },
})
