import request from '@/utils/request'

export async function getPageData() {
  try {
    const res = await request({
      url: 'dataq/api/page/pageDatas',
      method: 'post'
    })
    return res;
  } catch (err) {
    return false;
  }
}

export async function getexpandData() {
  try {
    const res = await request({
      url: 'dataq/api/page/expandDatas',
      method: 'post'
    })
    return res;
  } catch (err) {
    return false;
  }
}

export async function getGroupByData() {
  try {
    const res = await request({
      url: 'dataq/api/page/groupByDatas',
      method: 'post'
    })
    return res;
  } catch (err) {
    return false;
  }
}

export async function getPopupFormData() {
  try {
    const res = await request({
      url: 'dataq/api/page/popupFormDatas',
      method: 'post'
    })
    return res;
  } catch (err) {
    return false;
  }
}