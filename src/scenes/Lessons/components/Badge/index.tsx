import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import {
  GSBadge,
  GSBadgeRibbon140,
  GSBadgeRibbonCircle,
  GSBadgeRubbonNeg140,
} from './index.styles'

interface IProps {
  style?: StyleProp<ViewStyle>
  children: React.ReactChildren | React.ReactChild
}
export default (props: IProps) => (
  <GSBadge style={props.style}>
    <GSBadgeRubbonNeg140 />
    <GSBadgeRibbon140 />
    <GSBadgeRibbonCircle>{props.children}</GSBadgeRibbonCircle>
  </GSBadge>
)
