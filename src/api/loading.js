// import { Loading } from 'element-ui';
import { Indicator } from 'mint-ui';
let loadingCount = 0;
let loading;
 
const startLoading = () => {
  loading = Indicator.open({
    text: '加载中……',
    spinnerType: 'fading-circle'
  });
};
 
const endLoading = () => {
    loading=Indicator.close();
};
 
export const showLoading = () => {
  if (loadingCount === 0) {
    startLoading();
  }
  loadingCount += 1;
};
 
export const hideLoading = () => {
  if (loadingCount <= 0) {
    return;
  }
  loadingCount -= 1;
  if (loadingCount === 0) {
    endLoading();
  }
}