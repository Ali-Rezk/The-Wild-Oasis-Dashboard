import { useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useCurrentUser, useUpdateUser } from "./useAuth";

function UpdateUserDataForm() {
  // We don't need the loading state
  const {
    user: {
      email,
      user_metadata: { full_name: currentFullName },
    },
  } = useCurrentUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);
  const [errors, setErrors] = useState({});

  const { mutate: updateUser, isLoading: isUpdating } = useUpdateUser();

  function validate() {
    const newErrors = {};
    if (!fullName || !fullName.trim())
      newErrors.fullName = "Full name is required";
    else if (!/^[a-zA-Z\s]+$/.test(fullName.trim()))
      newErrors.fullName = "Full name may only contain letters";
    if (avatar && !avatar.type.startsWith("image/"))
      newErrors.avatar = "File must be an image";
    return newErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    updateUser(
      { full_name: fullName.trim(), avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          // Resetting form using .reset() that's available on all HTML form elements, otherwise the old filename will stay displayed in the UI
          e.target.reset();
        },
      },
    );
  }

  function handleCancel() {
    // We don't even need preventDefault because this button was designed to reset the form (remember, it has the HTML attribute 'reset')
    setFullName(currentFullName);
    setAvatar(null);
    setErrors({});
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name" error={errors.fullName}>
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
          id="full_name"
        />
      </FormRow>
      <FormRow label="Avatar image" error={errors.avatar}>
        <FileInput
          disabled={isUpdating}
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          // We should also validate that it's actually an image, but never mind
        />
      </FormRow>
      <FormRow>
        <Button onClick={handleCancel} type="reset" variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
