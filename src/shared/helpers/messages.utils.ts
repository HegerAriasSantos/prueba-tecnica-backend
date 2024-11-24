import {
	ActionsEnums,
	ActionsErrorsEnums,
} from "../../shared/enums/actions.enum";

export class MessagesUtils {
	public static createSuccessMessage(
		entity: string,
		action: ActionsEnums,
	): string {
		return `${entity} ${action.toString()}`;
	}

	public static createErrorMessage(
		entity: string,
		action: ActionsErrorsEnums,
	): string {
		return `${action.toString()} ${entity}`;
	}
}
