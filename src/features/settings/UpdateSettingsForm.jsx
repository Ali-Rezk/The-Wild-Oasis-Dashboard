import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import { useGetSettings, useUpdateSetting } from "./settingsHooks";

function UpdateSettingsForm() {
  const { data: settings, isLoading, isError } = useGetSettings();
  const { mutate } = useUpdateSetting();
  if (isLoading) return <Spinner />;
  if (isError) return <p>Error loading settings</p>;

  function handleUpdateSetting(e) {
    const settingName = e.target.id;
    const newValue = e.target.value;
    if (Number(newValue) === settings[settingName])
      return; // No change, do nothing
    else if (
      window.confirm(
        `Are you sure you want to update ${settingName} to ${newValue}?`,
      )
    ) {
      mutate({ [settingName]: Number(newValue) });
    }
    {
      // Revert to original value if user cancels
      e.target.value = settings[settingName];
    }
  }
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="minBookingLength"
          defaultValue={settings.minBookingLength}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="maxBookingLength"
          defaultValue={settings.maxBookingLength}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="maxPersonPerBooking"
          defaultValue={settings.maxPersonPerBooking}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfastPrice"
          defaultValue={settings.breakfastPrice}
          onBlur={handleUpdateSetting}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
