import axios from "@/api/request";

/**
 * 获取热榜分类数据
 * @param {string} source 热榜分类名称
 * @param {boolean} isNew 是否拉取最新数据
 * @param {object} params 请求参数
 * @returns
 */
export const getHotLists = (source, params) => {
  
  return axios({
    method: "GET",
    url: `/hotlist/${source}`,
    params: {
      ...params,
    },
  });
};
