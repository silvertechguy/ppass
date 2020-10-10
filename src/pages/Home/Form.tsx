import React, { useState } from "react";
import Button from "../../components/Button/Button.style";
import { FormContainer, Label, Input } from "./Form.style";

interface FormProps {
  onSearch: (password: string) => Promise<void>;
}

const Form: React.FC<FormProps> = ({ onSearch }) => {
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    onSearch(password);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(e.target.value);
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <Label>
        check /
        <Input
          type="password"
          name="password"
          value={password}
          onChange={handleInputChange}
          placeholder={"Your Password"}
        />
      </Label>

      <Button type="submit">Check</Button>
    </FormContainer>
  );
};

export default Form;
