import React from 'react';
import connect from 'components/Loading/connect';
import Loading from 'components/Loading/Loading';
export default connect(({ loading, children }) => (loading ? React.createElement(Loading, { loading: true, noModal: true }) : children));
//# sourceMappingURL=index.js.map