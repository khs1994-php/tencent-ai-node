import AbstractTencentAI from './AbstractTencentAI';
import { URIS, commonParams, error } from './util/util';
import Request from './client/Request';
import TencentAIResult from './TencentAIResult';

export default class OCR extends AbstractTencentAI {
  /**
   * OCR 服务类
   *
   * @method idcardocr(image, type) 身份证OCR识别
   * @method bcocr(image) 名片OCR识别
   * @method driverlicenseocr(image, type) 行驶证驾驶证OCR识别
   * @method bizlicenseocr(image) 营业执照OCR识别
   * @method creditcardocr(image) 银行卡OCR识别
   * @method generalocr(image) 通用OCR识别
   * @method plateocr(image) 车牌识别
   * @method handwritingocr(image) 手写体识别
   */

  /**
   * 身份证 OCR 识别
   *
   * 根据用户上传的包含身份证正反面照片，识别并且获取证件姓名、性别、民族、出生日期、地址、身份证号、证件有效期、发证机关等详细的身份证信息，并且可以返回精确剪裁对齐后的身份证正反面图片。
   *
   * @see https://ai.qq.com/doc/ocridcardocr.shtml
   * @param {String} image  待识别图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB 支持JPG、PNG、BMP格式）
   * @param {Number} card_type  身份证图片类型，0-正面，1-反面
   *
   * @return {Promise} A Promise Object
   */
  async idcard(image: string, card_type: 0 | 1 = 0): Promise<TencentAIResult> {
    image = await this.readFileSync(image);

    return Request(
      this.proxy,
      URIS.idcardocr,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
        card_type,
      }),
    );
  }

  /**
   * 名片 OCR 识别
   *
   * 根据用户上传的名片图像，返回识别出的名片字段信息，目前已支持20多个字段识别（姓名、英文姓名、职位、英文职位、部门、英文部门、公司、英文公司、地址、英文地址、邮编、邮箱、网址、手机、电话、传真、QQ、MSN、微信、微博、公司账号、logo、其他）
   *
   * @see https://ai.qq.com/doc/ocrbcocr.shtml
   * @param {String} image 待识别图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB 支持JPG、PNG、BMP格式）
   *
   * @return {Promise} A Promise Object
   */
  async bc(image: string) {
    image = await this.readFileSync(image);

    return Request(
      this.proxy,
      URIS.bcocr,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
      }),
    );
  }

  /**
   * 行驶证驾驶证 OCR 识别
   *
   * 根据用户上传的图像，返回识别出行驶证&驾驶证各字段信息。（行驶证支持字段：车牌号码、车辆类型、所有人、住址、使用性质、品牌型号、识别代码、发动机号、注册日期、发证日期；驾驶证支持字段：证号、姓名、性别、国籍、住址、出生日期、领证日期、准驾车型、起始日期、有效日期）
   *
   * @see https://ai.qq.com/doc/ocrdriverlicenseocr.shtml
   * @param {String} image 待识别图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB 支持JPG、PNG、BMP格式）
   * @param {Number} type  识别类型，0-行驶证识别，1-驾驶证识别
   *
   * @return {Promise} A Promise Object
   */
  async driverLicense(
    image: string,
    type: 0 | 1 = 1,
  ): Promise<TencentAIResult> {
    image = await this.readFileSync(image);

    return Request(
      this.proxy,
      URIS.driverlicenseocr,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
        type,
      }),
    );
  }

  /**
   * 通用 OCR 识别
   *
   * 根据用户上传的图像，返回识别出的字段信息
   *
   * @see https://ai.qq.com/doc/ocrgeneralocr.shtml
   * @param {String} image 待识别图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB 支持JPG、PNG、BMP格式）
   *
   * @return {Promise} A Promise Object
   */
  async general(image: string): Promise<TencentAIResult> {
    image = await this.readFileSync(image);

    return Request(
      this.proxy,
      URIS.generalocr,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
      }),
    );
  }

  /**
   * 营业执照 OCR 识别
   *
   * 营业执照OCR 识别，根据用户上传的营业执照图像，返回识别出的注册号、公司名称、地址字段信息。
   *
   * @see https://ai.qq.com/doc/ocrbizlicenseocr.shtml
   * @param {String} image 待识别图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB 支持JPG、PNG、BMP格式）
   *
   * @return {Promise} A Promise Object
   */
  async bizlicense(image: string): Promise<TencentAIResult> {
    image = await this.readFileSync(image);

    return Request(
      this.proxy,
      URIS.bizlicenseocr,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
      }),
    );
  }

  /**
   * 银行卡 OCR 识别
   *
   * 根据用户上传的银行卡图像，返回识别出的银行卡字段信息
   *
   * @see https://ai.qq.com/doc/ocrcreditcardocr.shtml
   * @param {String} image 待识别图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB 支持JPG、PNG、BMP格式）
   *
   * @return {Promise} A Promise Object
   */
  async creditcard(image: string): Promise<TencentAIResult> {
    image = await this.readFileSync(image);

    return Request(
      this.proxy,
      URIS.creditcardocr,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
      }),
    );
  }

  /**
   * 车牌 OCR
   *
   * 识别车牌上面的字段信息
   *
   * @see https://ai.qq.com/doc/plateocr.shtml
   * @param {String} image 待识别图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB 支持JPG、PNG、BMP格式）
   *
   * @return {Promise} A Promise Object
   */
  async plate(image: string) {
    if (image && /^http\S*[.jpg|.bmp|.png]$/g.test(image)) {
      return Request(
        this.proxy,
        URIS.plateocr,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          image_url: image,
        }),
      );
    }

    image = await this.readFileSync(image);

    return Request(
      this.proxy,
      URIS.plateocr,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
      }),
    );
  }

  /**
   * 手写体 OCR
   *
   * 检测和识别图像上面手写体的字段信息
   *
   * @see https://ai.qq.com/doc/handwritingocr.shtml
   * @param {String} image 待识别图片 本地图片路径 | 图片的 base64 编码数据 | 图片 url （大小上限1MB 支持JPG、PNG、BMP格式）
   *
   * @return {Promise} A Promise Object
   */
  async handwriting(image: string) {
    if (image && /^http\S*[.jpg|.bmp|.png]$/g.test(image)) {
      return Request(
        this.proxy,
        URIS.handwritingocr,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          image_url: image,
        }),
      );
    }
    image = await this.readFileSync(image);
    return Request(
      this.proxy,
      URIS.handwritingocr,
      this.appKey,
      Object.assign({}, commonParams(), {
        app_id: this.appId,
        image,
      }),
    );
  }
}
