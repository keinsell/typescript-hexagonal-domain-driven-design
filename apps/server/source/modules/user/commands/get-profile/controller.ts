/* eslint-disable node/file-extension-in-import */
import { Body, Get, OperationId, Response, Route, Tags } from "tsoa";
import { Controller } from "../../../../common/lib/application/controller";
import { User } from "../../entity";
import { GetProfileCommand } from "./command";
import { UserProfileDataTransferObject } from "./response";
import { GetProfileService } from "./service";

@Tags("User")
@Route()
export class GetProfileController extends Controller {
	protected service = new GetProfileService();

	@Get("me")
	@OperationId("get-profile")
	@Response<UserProfileDataTransferObject>(200, "OK")
	protected async executeImplementation(): Promise<
		UserProfileDataTransferObject | any
	> {
		const user = (this.req as any).user as User;

		const command = new GetProfileCommand({ userId: user.id });

		const response = await this.service.execute(command);

		if (response.error) {
			return this.res.status(400).json(response);
		}

		return this.res.status(200).json(response);
	}
}
