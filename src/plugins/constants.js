import * as Constants from '@/constants'

export default ({app}, inject) => {
  inject('constants', Constants)
}
