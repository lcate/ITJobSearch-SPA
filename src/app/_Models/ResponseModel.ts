import { ResponseCode } from '../Enums/ResponseCode';

export class ResponseModel{
  public  responseCode: ResponseCode = ResponseCode.NotSet;
  public responseMessage = '';
  public  dataSet: any;
}
