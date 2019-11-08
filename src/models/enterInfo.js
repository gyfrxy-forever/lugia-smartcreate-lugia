import lugiax from "@lugia/lugiax";
import { go } from "@lugia/lugiax-router";

const __LUGIAX_MODEL_DEFINE__ = "enterInfo"; // lugiax-model-define
const state = {
  fundCode: null,
  fundName: null,
  stock: null,
  cost: null,
  marketValue: null,
  ratio: null

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

      doClearInfo(state, inParam) {
        state =  state.set('fundCode', null);
        state = state.set('fundName', null);
        state = state.set('stock', null);
        state = state.set('cost', null);
        state = state.set('marketValue', null);
        return state.set('ratio', null);
      },

      doJump(state,inParam){
        go({ url: "/search" })
      }
    },
    async: {
        async setFundInfo(state, inParam, {mutations}) {
          const fundCode = state.get('fundCode');
          const fundName = state.get('fundName');
          const stock = state.get('stock');
          const cost = state.get('cost');
          const marketValue = state.get('marketValue');
          const ratio = state.get('ratio');

        const result = await fetch('http://127.0.0.1:7001/setFundInfo',
          {
            method: 'Post',
            body: JSON.stringify({ info:{fundCode,fundName,stock,cost,marketValue,ratio} }),
            headers: new Headers({'Content-Type': 'application/json'}),
          }).then(response => response.json()).then(data => {
            const { doJump } = mutations;
            doJump();
          return data;
        });
        return state.set('fundInfo', result.data);
      }

    }
  }
});
