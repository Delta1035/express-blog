export type ReponseStatus = "success" | "fail";
export default class Utils {
  static readonly resposne = function (
    code: number,
    status: ReponseStatus,
    data: any
  ) {
    if (status === "fail") {
      return {
        code: code,
        status: "fail",
        msg: data,
      };
    } else if (status === "success") {
      return {
        code: code,
        status: "success",
        data: data,
      };
    }
  };
}
