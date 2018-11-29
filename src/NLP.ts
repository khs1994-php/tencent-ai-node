import { URIS, commonParams, error, textToGBK } from './util/index';
import AbstractTencentAI from './AbstractTencentAI';
import Request from './client/Request';

export default class NLP extends AbstractTencentAI {
  /**
   * 自然语言处理基础部分
   *
   * @method wordseg(String) 分词
   * @method wordpos(String) 词性标注
   * @method wordner(String) 专有名词识别
   * @method wordsyn(String) 同义词识别
   * @method wordcom(String) 语义解析
   * @method textpolar(String) 情感分析
   * @method textchat(Object) 智能闲聊
   */

  /**
   * 分词
   *
   * 分词接口提供智能分词功能，支持基础词与混排词粒度两种粒度，其中基础词粒度最小，适合搜索场景，而混合词粒度倾向于保留更多的短语词。
   *
   * @see https://ai.qq.com/doc/nlpbase.shtml
   * @param {String} text  待分析文本 GBK编码，非空且长度上限1024字节
   *
   * @return {Promise} A Promise Object
   */
  wordseg(text) {
    if (text && Buffer.byteLength(text, 'GBK') < 1024) {
      return Request.request(
        URIS.wordseg,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          text: textToGBK(text),
        }),
        true,
      );
    } else {
      return error('text不能为空 或者GBK编码应小于1024B');
    }
  }

  /**
   * 词性标注
   *
   * 词性标注接口在分词接口的基础上，增加词性标注能力，将分词结果中的每个分词赋予一个正确的词性，例如形容词、动名或者名词等等。
   *
   * @see https://ai.qq.com/doc/nlpbase.shtml
   * @param {String} text  待分析文本 GBK编码，非空且长度上限1024字节
   *
   * @return {Promise} A Promise Object
   */
  wordpos(text) {
    if (text && Buffer.byteLength(text, 'GBK') < 1024) {
      return Request.request(
        URIS.wordpos,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          text: textToGBK(text),
        }),
        true,
      );
    } else {
      return error('text不能为空 或者GBK编码应小于1024B');
    }
  }

  /**
   * 专有名词识别
   *
   * 专有名词识别接口在分词接口的基础上，增加专有名词识别能力，可以帮您轻松找出一段文本中的专有名词。
   *
   * @see https://ai.qq.com/doc/nlpbase.shtml
   * @param {String} text  待分析文本 GBK编码，非空且长度上限1024字节
   *
   * @return {Promise|error} A Promise Object
   */
  wordner(text) {
    if (text && Buffer.byteLength(text, 'GBK') < 1024) {
      return Request.request(
        URIS.wordner,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          text: textToGBK(text),
        }),
        true,
      );
    } else {
      return error('text不能为空 或者GBK编码应小于1024B');
    }
  }

  /**
   * 同义词识别
   *
   * 同义词识别接口在分词接口的基础上，增加同义词识别能力，可以帮您轻松找出一段文本中的每个分词的同义词。
   *
   * @see https://ai.qq.com/doc/nlpbase.shtml
   * @param {String} text  待分析文本 GBK编码，非空且长度上限1024字节
   *
   * @return {Promise|error} A Promise Object
   */
  wordsyn(text) {
    if (text && Buffer.byteLength(text, 'GBK') < 1024) {
      return Request.request(
        URIS.wordsyn,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          text: textToGBK(text),
        }),
        true,
      );
    } else {
      return error('text不能为空 或者GBK编码应小于1024B');
    }
  }

  /**
   * 语义解析
   *
   * 意图成分识别接口提供意图和成分识别能力，可以帮您轻松找出一段文本包含的用户意图以及上下文成分分词。
   *
   * @see https://ai.qq.com/doc/nlpsem.shtml
   * @param {String} text  待分析文本 UTF-8编码，非空且长度上限100字节
   *
   * @return {Promise} A Promise Object
   */
  wordcom(text) {
    if (text && Buffer.byteLength(text, 'utf8') < 100) {
      return Request.request(
        URIS.wordcom,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          text: text,
        }),
      );
    } else {
      return error('text不能为空 或者UTF-8编码应小于100B');
    }
  }

  /**
   * 情感分析
   *
   * 情感分析识别接口提供情感识别能力，可以帮您快速判断一段文本所隐含的情感倾向。
   *
   * @see https://ai.qq.com/doc/nlpemo.shtml
   * @param {String} text  待分析文本 UTF-8编码，非空且长度上限200字节
   *
   * @return {Promise} A Promise Object
   */
  textpolar(text) {
    if (text && Buffer.byteLength(text, 'utf8') < 200) {
      return Request.request(
        URIS.textpolar,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          text: text,
        }),
      );
    } else {
      return error('text不能为空 或者UTF-8编码应小于200B');
    }
  }

  /**
   * 智能闲聊
   *
   * 基础闲聊接口提供基于文本的基础聊天能力，可以让您的应用快速拥有具备上下文语义理解的机器聊天功能。
   *
   * @see https://ai.qq.com/doc/nlpchat.shtml
   * @param {String} question  待分析文本 UTF-8编码，非空且长度上限300字节
   * @param {String} session  会话标识（应用内唯一） UTF-8编码，非空且长度上限32字节
   *
   * @return {Promise} A Promise Object
   */
  textchat(question, session) {
    if (
      question &&
      Buffer.byteLength(question, 'utf8') < 300 &&
      session &&
      Buffer.byteLength(session, 'utf8') < 64
    ) {
      return Request.request(
        URIS.textchat,
        this.appKey,
        Object.assign({}, commonParams(), {
          app_id: this.appId,
          question: question,
          session: session,
        }),
      );
    } else {
      return error(
        'question/session不能为空 或者questio UTF-8编码应小于300B session  UTF-8编码应小于64B',
      );
    }
  }
}