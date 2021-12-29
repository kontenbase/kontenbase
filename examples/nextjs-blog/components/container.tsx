import { ReactNode, FunctionComponent } from 'react';

type Props = {
  children?: ReactNode;
};

const Container: FunctionComponent = ({ children }: Props) => {
  return <div className="container mx-auto px-2 md:px-16">{children}</div>;
};

export default Container;
