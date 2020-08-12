import React from 'react'
import connect, { ILoadingProps } from '@sl/components/Loading/connect'
import Loading from '@sl/components/Loading/Loading'

export interface IProps extends ILoadingProps {
  children: React.ReactElement<any>
}

export default connect(({ loading, children }: IProps) =>
  loading ? <Loading loading noModal /> : children,
)
