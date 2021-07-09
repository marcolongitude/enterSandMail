import React from "react";
import ReactLoading, { LoadingType } from 'react-loading'

interface Props {
  type: LoadingType;
  color?: string;
}

export const Loading = ({type, color = '#0077b6'}: Props): JSX.Element => {
  return (
    <ReactLoading type={type} color={color} height={'10%'} width={'10%'} />
  )
}

export default Loading