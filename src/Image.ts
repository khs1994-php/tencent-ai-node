import AbstractTencentAI from './AbstractTencentAI';
import { URIS, commonParams, error } from './util/index';
import Request from './client/Request';

export default class Image extends AbstractTencentAI {
  /**
   * 图片识别公共 API 服务类
   *
   * @method porn(imageBase64String) 智能鉴黄
   * @method terrorism(imageBase64String) 暴恐识别
   * @method scener(imageBase64String) 场景识别
   * @method objectr(imageBase64String) 物体识别
   * @method imagetag(imageBase64String) 图像标签识别
   * @method imgidentify(imageBase64String) 花草/车辆识别
   * @method imgtotext(imageBase64String) 看图说话
   * @method imagefuzzy(imageBase64String) 模糊图片检测
   * @method imagefood(imageBase64String) 获取人脸信息
   */

  /**
   * 智能鉴黄
   *
   * 识别一个图像是否为色情图像
   *
   * @see https://ai.qq.com/doc/jianhuang.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（原图大小上限1MB）
   * @param {String} image_url
   *
   * @return {Promise} A Promise Object
   */
  porn(imageBase64String = '', image_url = '') {
    if (
      imageBase64String &&
      Buffer.byteLength(imageBase64String, 'base64') > 1048576
    ) {
      return error('imageBase64String 不能为空 且 大小小于1M');
    }

    if (!imageBase64String && !image_url) {
      return error('image and url all empty');
    }

    return Request.request(
      URIS.porn,
      this.appKey,
      Object.assign(
        {},
        commonParams(),
        { app_id: this.appId },
        imageBase64String
          ? { image: imageBase64String }
          : { image_url: image_url },
      ),
    );
  }

  /**
   * 暴恐识别
   *
   * 识别一个图像是否为暴恐图像
   *
   * @see https://ai.qq.com/doc/imageterrorism.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（原图大小上限1MB）
   * @param {String} image_url
   *
   * @return {Promise} A Promise Object
   */
  terrorism(imageBase64String = '', image_url = '') {
    if (
      imageBase64String &&
      Buffer.byteLength(imageBase64String, 'base64') > 1048576
    ) {
      return error('imageBase64String 不能为空 且 大小小于1M');
    }

    if (!imageBase64String && !image_url) {
      return error('image and url all empty');
    }

    return Request.request(
      URIS.terrorism,
      this.appKey,
      Object.assign(
        {},
        commonParams(),
        { app_id: this.appId },
        image_url ? { image_url: image_url } : { image: imageBase64String },
      ),
    );
  }

  /**
   * 场景识别
   *
   * 场景识别接口提供场景识别能力，可以帮您快速找出图片中包含的场景信息。
   *
   * @see https://ai.qq.com/doc/visionimgidy.shtml
   * @param {String} image 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   * @param {Number} format 默认1 图片格式 [1  JPG格式（image/jpeg）]
   * @param {Number} topk 默认1 返回结果个数（已按置信度倒排）[1-5]
   *
   * @return {Promise} A Promise Object
   */
  scener(image, format = 1, topk = 1) {
    if (image && Buffer.byteLength(image, 'base64') < 1048576) {
      return Request.request(
        URIS.scener,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          image: image,
          format: format,
          topk: topk,
        }),
      );
    } else {
      return error('image 不能为空 且 大小小于1M');
    }
  }

  /**
   * 物体识别
   *
   * 物体识别接口提供物体识别能力，可以帮您快速找出图片中包含的物体信息。
   *
   * @see https://ai.qq.com/doc/visionimgidy.shtml
   * @param {String} image 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   * @param {Number} format 默认1 图片格式 [1  JPG格式（image/jpeg）]
   * @param {Number} topk 默认1 返回结果个数（已按置信度倒排）[1-5]
   *
   * @return {Promise} A Promise Object
   */
  objectr(image, format = 1, topk = 1) {
    if (image && Buffer.byteLength(image, 'base64') < 1048576) {
      return Request.request(
        URIS.objectr,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          image: image,
          format: format,
          topk: topk,
        }),
      );
    } else {
      return error('image 不能为空 且 大小小于1M');
    }
  }

  /**
   * 图像标签识别
   *
   * 识别一个图像的标签信息,对图像分类
   *
   * @see https://ai.qq.com/doc/imagetag.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   *
   * @return {Promise} A Promise Object
   */
  imagetag(imageBase64String) {
    if (
      imageBase64String &&
      Buffer.byteLength(imageBase64String, 'base64') < 1048576
    ) {
      return Request.request(
        URIS.imagetag,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          image: imageBase64String,
        }),
      );
    } else {
      return error('imageBase64String 不能为空 且 大小小于1M');
    }
  }

  /**
   * 花草/车辆识别
   *
   * 花草/车辆识别接口提供特定类别的识别能力，可以根据您选择的场景识别出图片中的花草或车辆信息，目前已覆盖3000种常见花草，近3000类车型。
   *
   * @see https://ai.qq.com/doc/imgidentify.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   * @param {Number} scene  识别场景，1-车辆识别，2-花草识别
   *
   * @return {Promise} A Promise Object
   */
  imgidentify(imageBase64String, scene = 1) {
    if (
      imageBase64String &&
      Buffer.byteLength(imageBase64String, 'base64') < 1048576
    ) {
      return Request.request(
        URIS.imgidentify,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          image: imageBase64String,
          scene: scene,
        }),
      );
    } else {
      return error('imageBase64String 不能为空 且 大小小于1M');
    }
  }

  /**
   * 看图说话
   *
   * 用一句话文字描述图片。
   *
   * @see https://ai.qq.com/doc/imgtotext.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   * @param {String} session_id  一次请求ID 尽可能唯一，长度上限64字节
   *
   * @return {Promise} A Promise Object
   */
  imgtotext(imageBase64String, session_id) {
    if (
      imageBase64String &&
      Buffer.byteLength(imageBase64String, 'base64') < 1048576 &&
      session_id &&
      Buffer.byteLength(session_id, 'base64') < 64
    ) {
      return Request.request(
        URIS.imgtotext,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          image: imageBase64String,
          session_id: session_id,
        }),
      );
    } else {
      return error(
        'imageBase64String/session_id 不能为空 且 imageBase64String大小小于1M session_id长度小于64B',
      );
    }
  }

  /**
   * 模糊图片检测
   *
   * 判断一个图像的模糊程度。
   *
   * @see https://ai.qq.com/doc/imagefuzzy.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   *
   * @return {Promise} A Promise Object
   */
  imagefuzzy(imageBase64String) {
    if (
      imageBase64String &&
      Buffer.byteLength(imageBase64String, 'base64') < 1048576
    ) {
      return Request.request(
        URIS.imagefuzzy,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          image: imageBase64String,
        }),
      );
    } else {
      return error('imageBase64String 不能为空 且 大小小于1M');
    }
  }

  /**
   * 美食图片识别
   *
   * 识别一个图像是否为美食图像。
   *
   * @see https://ai.qq.com/doc/imagefood.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   *
   * @return {Promise} A Promise Object
   */
  imagefood(imageBase64String) {
    if (
      imageBase64String &&
      Buffer.byteLength(imageBase64String, 'base64') < 1048576
    ) {
      return Request.request(
        URIS.imagefood,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          image: imageBase64String,
        }),
      );
    } else {
      return error('imageBase64String 不能为空 且 大小小于1M');
    }
  }
}