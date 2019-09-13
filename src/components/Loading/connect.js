import { connect } from 'react-redux';
const mapStateToDispatch = (state) => ({
    loading: state.api.loading
});
export default connect(mapStateToDispatch);
//# sourceMappingURL=connect.js.map