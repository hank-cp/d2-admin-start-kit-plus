import axios from '@/d2admin/plugin/axios'

export default {
  demoApi () {
    return axios.get(`/demo-api`)
  }
}
