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