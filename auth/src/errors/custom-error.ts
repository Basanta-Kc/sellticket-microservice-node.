export abstract class CustomError extends Error {
	abstract statusCode: number

	constructor(message: string) {
		super(message) // mesage is for logging purpose

		Object.setPrototypeOf(this, CustomError.prototype)
	}

	abstract serializeErrors(): { message: string; field?: string }[]
}
