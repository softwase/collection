import styled from 'styled-components/macro';

interface IOverlayProps {
  visible: boolean
}

export const OverlayContainer = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

export const Overlay = styled.div<IOverlayProps>`
  position: absolute;
  width: 100%;
  bottom: ${ ({ visible }) => (visible ? '100%' : '0') };
  height: ${ ({ visible }) => (visible ? '0' : '100%') };
  left: 0;
  right: 0;
  background-color: #008CBA;
  overflow: hidden;
  transition: .5s ease; 
`;
