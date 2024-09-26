/**
 * Generic Handler for model controllers
 * @param {string} name -> Resource Name 
 * @returns 
 */
export default function handler(name = "Resource") {
  return {
    /**
     * Utility function to handle promises with different 
     * HTTP codes for GET, POST, PUT, DELETE
     *
     * @param {Promise} promise
     * @param {String} method
     * @returns 
     */
    handlePromise: async (promise, method) => {
      try {
        const result = await promise // Await the promise to resolve or reject

        if (!result || (Array.isArray(result) && result.length === 0)) {
          // If result is null, undefined, or an empty array, return 404
          return {
            success: false,
            statusCode: method == "POST" ? 400 : 404,
            message:
              method === "POST"
                ? `Failed to create ${name}`
                : `${name} not found`,
            data: null,
          }
        }

        // Return success with different status codes for each method
        let statusCode, message

        switch (method) {
          case "GET":
            statusCode = 200
            message = `${name} fetched successfully`
            break
          case "POST":
            statusCode = 201
            message = `${name} created successfully`
            break
          case "PUT":
            statusCode = 204
            message = `${name} updated successfully`
            break
          case "DELETE":
            statusCode = 204
            message = `${name} deleted successfully`
            break
          default:
            statusCode = 200
            message = "Success"
        }

        return { success: true, statusCode, message, data: result }
      } catch (error) {
        // Handle errors with a 500 code
        console.error("Error:", error.message)

        return {
          success: false,
          statusCode: error.name == "ValidationError" ? 422 : 500,
          message:
            error.name == "ValidationError"
              ? "Validation Error"
              : "Internal server error",
          data: error.message,
        }
      }
    },
  }
}
