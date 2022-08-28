import { Button } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const StyledRegister = styled.div`
  /* background-color: rgb(238, 77, 45); */
  min-width: max-content;
  background-color: #dddddd;
  height: 100vh;
  display: flex;
`

export const Container = styled.div`
  background-color: #ffffff;
  box-shadow: #d7d7d7 0px 4px 16px 0px;
  border: 1px solid #eeeeee;
  padding: 4rem;
  width: 45rem;
  border-radius: 2rem;
  margin: auto;
`

export const HeadingRegister = styled.div`
  text-align: center;
  font-weight: bold;
  color: transparent;
  background-image: linear-gradient(
    90.06deg,
    rgb(248, 96, 134) -4.45%,
    rgb(254, 141, 119) 104.12%
  );
  -webkit-background-clip: text;
  font-size: 3rem;
  padding-bottom: 40px;
`

export const LinkGoogle = styled(Link)`
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  border-radius: 16px;
  background-color: #4c6ef4;
  text-decoration: none;
  padding: 8px;
  margin-bottom: 45px;
  box-shadow: 0 10px 20px -5px rgba(76, 110, 244, 0.9);
`

export const IconGoogle = styled.div`
  width: 50px;
  height: 50px;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  color: #ff7870;
  border-radius: 10px;
  background-color: white;
  font-size: 25px;
`

export const TextGoogle = styled.div`
  color: white;
  font-weight: 500;
  display: block;
  margin: 0 auto;
`

export const Or = styled.div`
  color: #363a40;
  display: block;
  text-align: center;
  position: relative;
  margin-bottom: 55px;
  &:before {
    content: '';
    height: 1px;
    width: 100%;
    position: absolute;
    top: 50%;
    left: 0;
    background-color: #999;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
  }
`

export const OrText = styled.span`
  display: inline-block;
  padding: 5px 20px;
  background-color: white;
  position: relative;
  font-size: 14px;
`

// export const TextGoogle = styled.div`

// `;

export const FormWrapper = styled.div`
  /* flex: 0 0 50%;
  max-width: 50%;
  box-shadow: 0 3px 10px 0 rgb(0 0 0 / 14%);
  border-radius: 0.4rem;
  background-color: #fff;
  padding: 3.5rem 3rem 5rem; */
`

export const Form = styled.form``

export const FormControl = styled.div`
  margin-bottom: 2.5rem;
`

export const FormButton = styled.div`
  margin-bottom: 3rem;
  ${Button} {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 25px;
    color: white;
    text-align: center;
    cursor: pointer;
    border: 0;
    border-radius: 10px;
    background: linear-gradient(
      90.06deg,
      rgb(248, 96, 134) -4.45%,
      rgb(254, 141, 119) 104.12%
    );
    font-size: 18px;
    font-weight: 500;
    /* font-family: "Inter", sans-serif !important; */
    font-family: 'Poppins', sans-serif !important;
    box-shadow: 0 10px 20px -5px rgba(248, 96, 141, 0.9);
    outline: none;
  }
`

export const FormFooter = styled.div`
  text-align: center;
  span {
    margin-right: 1rem;
    color: rgba(0, 0, 0, 0.5);
  }

  .link {
    color: #4c6ef4;
  }
`
