import lugiax from "@lugia/lugiax";

const __LUGIAX_MODEL_DEFINE__ = "bindInfo"; // lugiax-model-define
const state = {
  searchInfo: null,
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
      onChangeSearchInfo(state, inParam) {
        const {eventArgs: {newValue}} = inParam;
        return state.set('searchInfo', newValue);
      },
      onChangePage(state, inParam,{mutations}) {
        const { asyncGetFundInfo, asyncDoChangePage, } = mutations;
        asyncDoChangePage(inParam).then( () => {
          asyncGetFundInfo();
        });

      },
      doClearInfo(state, inParam) {
        state =  state.set('current', null);
        state = state.set('searchInfo', null);
        state = state.set('total', null);
        return state;
      },
    },
    async: {

      async doChangePage(state, inParam,{mutations}) {
        const {eventArgs: {current}} = inParam;
        return state.set('current', current);
      },

      async getFundInfo(state, inParam, {mutations}) {
        const searchInfo = state.get('searchInfo') || '';
        const limit = state.get('pageSize') ;
        const page = state.get('current') || 1;
        const query = {searchInfo:{fundCode:searchInfo}, page, limit};

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
