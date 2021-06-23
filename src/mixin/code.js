/*
 * @Author: your name
 * @Date: 2021-03-04 15:36:03
 * @LastEditTime: 2021-03-05 17:34:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front\src\minin\code.js
 */
import { v4 as uuidv4 } from 'uuid'
import { getCode } from '@/api/login.js'

export default {
  data() {
    return {
      code: '',
      svg: '',
    }
  },
  methods: {
    _getCode() {
      let sid = this.$store.state.sid
      getCode(sid).then((res) => {
        this.svg = res.data
      })
    },
  },
  mounted() {
    let sid = ''
    if (localStorage.getItem('sid')) {
      sid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid', sid)
    }
    this._getCode()
  },
}
