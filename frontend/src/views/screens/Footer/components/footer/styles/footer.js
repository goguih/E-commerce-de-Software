import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 274px;
  position: 'fixed';
  background: radial-gradient(circle, #1975d2 0%, #000);
  @media (max-width: 1000px) {
  }
`;

export const Wrapper = styled.div`
    display: flex;
   
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    /* background: red; */
`

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
  
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
  
`;

export const Link = styled.a`
  color: #fff;
  
  margin-bottom: 0px;
  font-size: 12px;
  text-decoration: none;
  &:hover {
      color: #000;
      transition: 200ms ease-in;
  }
`;

export const Title = styled.p`
  font-size: 20px;
  color: #fff;
  margin-bottom: 0px;
  font-weight: bold;
`;