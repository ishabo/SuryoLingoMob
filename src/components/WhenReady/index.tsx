import React from 'react';
import connect, { ILoadingProps } from 'components/Loading/connect';
import Loading from 'components/Loading/Loading';

export interface IProps extends ILoadingProps {
  children: React.ReactElement<any>;
}

export default connect(({ loading, children }: IProps) => (loading ? <Loading loading noModal /> : children));
