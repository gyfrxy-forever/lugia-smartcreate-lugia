import lugiax from "@lugia/lugiax";

const __LUGIAX_MODEL_DEFINE__ = "searchInfo"; // lugiax-model-define
const state = {
  fundCode:null,
  fundName:null,
  stock:null,
  cost:null,
  marketValue:null,
  ratio:null,
  pageSize:10,
  current: null,
  table:[],
  total:null
};

export default lugiax.register({
  model: __LUGIAX_MODEL_DEFINE__,
  state,
  mutations: {
    sync: {
      onChangeFundCode(state, inParam) {
        const {eventArgs: {newValue}} = inParam;
        return state.set('fundCode', newValue);
      },
      onChangeFundName(state, inParam) {
        const {eventArgs: {newValue}} = inParam;
        return state.set('fundName', newValue);
      },
      onChangeStock(state, inParam) {
        const {eventArgs: {newValue}} = inParam;
        return state.set('stock', newValue);
      },
      onChangeCost(state, inParam) {
        const {eventArgs: {newValue}} = inParam;
        return state.set('cost', newValue);
      },
      onChangeMarketValue(state, inParam) {
        const {eventArgs: {newValue}} = inParam;
        return state.set('marketValue', newValue);
      },
      onChangeRatio(state, inParam) {
        const {eventArgs: {newValue}} = inParam;
        return state.set('ratio', newValue);
      },
      onChangePage(state, inParam,{mutations}) {
        const { asyncGetFundInfo, asyncDoChangePage, } = mutations;
        asyncDoChangePage(inParam).then( () => {
          asyncGetFundInfo();
        });

      },
      doClearSearchInfo(state, inParam) {
        state =  state.set('fundCode', null);
        state = state.set('fundName', null);
        state = state.set('stock', null);
        state = state.set('cost', null);
        state = state.set('marketValue', null);
        state = state.set('total', null);
        return state.set('ratio', null);
      },
    },
    async: {
      async doChangePage(state, inParam,{mutations}) {
        const {eventArgs: {current}} = inParam;
        return state.set('current', current);
      },

      async getFundInfo(state, inParam, {mutations}) {
        const fundCode = state.get('fundCode');
        const fundName = state.get('fundName');
        const stock = state.get('stock');
        const cost = state.get('cost');
        const marketValue = state.get('marketValue');
        const ratio = state.get('ratio');
        const limit = state.get('pageSize') ;
        const page = state.get('current') || 1;
        const query = {searchInfo:{fundCode,fundName,stock,cost,marketValue,ratio}, page, limit};

        const result = await fetch('http://127.0.0.1:7001/getFundInfo',
          {
            method: 'Post',
            body: JSON.stringify({ ...query }),
            headers: new Headers({'Content-Type': 'application/json'}),
          }).then(response => response.json()).then(data => {
          return data
        });

        state =  state.set('total', result.total);
        return state.set('table', result.data);
      }
    }
  }
});
