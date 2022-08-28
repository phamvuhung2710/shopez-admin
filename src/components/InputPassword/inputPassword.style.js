import styled from 'styled-components'

export const FormControl = styled.div`
  margin-bottom: 10px;
  position: relative;
  width: 100%;
  input {
    display: block;
    width: 100%;
    padding: 20px 50px 20px 20px;
    border-radius: 10px;
    border: 0;
    outline: none;
    /* font-family: "Inter", sans-serif; */
    font-family: 'Poppins', sans-serif;
    background-color: #f2f3f5;
    color: #363a40;
    font-size: 16px;
  }
  button {
    padding: 0 1.5rem;
    flex-shrink: 0;
    background: transparent;
    border: none;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 2rem;
      position: absolute;
      top: 50%;
      right: 1.5rem;
      transform: translate(0, -50%);
    }
  }
`
