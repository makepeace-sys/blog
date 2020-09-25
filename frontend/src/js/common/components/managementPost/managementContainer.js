import { connect } from 'react-redux'
import { actions } from  '../../../redux/modules/managementPost/managementPost'

import ManagementList from './managementList'

const ms2p = (state) => {
  return {
    ...state.managementPost,
  };
};

const md2p = { ...actions };

//===========================
// Conection List User
//===========================
export default connect(ms2p, md2p)(ManagementList);