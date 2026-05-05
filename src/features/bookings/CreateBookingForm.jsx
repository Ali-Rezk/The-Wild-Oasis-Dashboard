import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { differenceInDays, parseISO } from "date-fns";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Checkbox from "../../ui/Checkbox";
import Textarea from "../../ui/Textarea";
import SpinnerMini from "../../ui/SpinnerMini";
import Modal from "../../ui/Modal";
import GuestsModal from "./GuestsModal";
import CabinsModal from "./CabinsModal";
import { useCreateBooking, useUpdateBooking } from "./bookingshooks";
import { useGetSettings } from "../settings/settingsHooks";
import { formatCurrency } from "../../utils/helpers";

export default function CreateBookingForm({ onCloseModal, booking }) {
  const isEditMode = Boolean(booking);

  const [selectedGuest, setSelectedGuest] = useState(
    isEditMode ? booking.guests : null,
  );
  const [selectedCabin, setSelectedCabin] = useState(
    isEditMode ? booking.cabins : null,
  );
  const [showGuestsModal, setShowGuestsModal] = useState(false);
  const [showCabinsModal, setShowCabinsModal] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const { data: settings } = useGetSettings();
  const { mutate: createBooking, isPending: isCreating } = useCreateBooking();
  const { mutate: updateBooking, isPending: isUpdating } = useUpdateBooking();
  const isPending = isCreating || isUpdating;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: isEditMode
      ? {
          startDate: booking.startDate?.slice(0, 10),
          endDate: booking.endDate?.slice(0, 10),
          numGuests: booking.numGuests,
          hasBreakfast: booking.hasBreakfast,
          observations: booking.observations ?? "",
        }
      : {
          startDate: "",
          endDate: "",
          numGuests: 1,
          hasBreakfast: false,
          observations: "",
        },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const hasBreakfast = watch("hasBreakfast");
  const numGuests = watch("numGuests");

  const numNights =
    startDate && endDate
      ? Math.max(
          0,
          differenceInDays(parseISO(endDate), parseISO(startDate)),
        )
      : 0;

  const cabinPrice = selectedCabin
    ? numNights *
      ((selectedCabin.regularPrice || 0) - (selectedCabin.discount || 0))
    : 0;

  const extrasPrice =
    hasBreakfast && settings
      ? numNights * (settings.breakfastPrice || 0) * Number(numGuests || 1)
      : 0;

  const totalPrice = cabinPrice + extrasPrice;

  function onSubmit(data) {
    setSubmitAttempted(true);
    if (!selectedGuest || !selectedCabin || numNights <= 0) return;

    const bookingData = {
      guestId: selectedGuest.id,
      cabinId: selectedCabin.id,
      startDate: new Date(data.startDate).toISOString(),
      endDate: new Date(data.endDate).toISOString(),
      numNights,
      numGuests: Number(data.numGuests),
      cabinPrice,
      extrasPrice,
      totalPrice,
      hasBreakfast: data.hasBreakfast,
      observations: data.observations,
    };

    if (isEditMode) {
      updateBooking(
        { id: booking.id, obj: bookingData },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        },
      );
    } else {
      createBooking(
        { ...bookingData, status: "unconfirmed", isPaid: false },
        {
          onSuccess: () => {
            reset();
            onCloseModal();
          },
        },
      );
    }
  }

  const guestError = submitAttempted && !selectedGuest ? "Please select a guest" : "";
  const cabinError = submitAttempted && !selectedCabin ? "Please select a cabin" : "";

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} type="modal">
        {/* Guest selection */}
        <FormRow label="Guest" error={guestError}>
          <div className="flex items-center gap-3 flex-wrap">
            {selectedGuest ? (
              <span className="font-medium">
                {selectedGuest.fullName}{" "}
                <span className="text-grey-500 text-[1.2rem]">
                  ({selectedGuest.email})
                </span>
              </span>
            ) : (
              <span className="text-grey-400 italic">No guest selected</span>
            )}
            <Button
              size="small"
              type="button"
              variation="secondary"
              onClick={() => setShowGuestsModal(true)}
            >
              {selectedGuest ? "Change guest" : "Select guest"}
            </Button>
          </div>
        </FormRow>

        {/* Cabin selection */}
        <FormRow label="Cabin" error={cabinError}>
          <div className="flex items-center gap-3 flex-wrap">
            {selectedCabin ? (
              <span className="font-medium font-['Sono']">
                {selectedCabin.name}{" "}
                <span className="text-grey-500 text-[1.2rem] font-sans">
                  ({formatCurrency(selectedCabin.regularPrice)}/night)
                </span>
              </span>
            ) : (
              <span className="text-grey-400 italic">No cabin selected</span>
            )}
            <Button
              size="small"
              type="button"
              variation="secondary"
              onClick={() => setShowCabinsModal(true)}
            >
              {selectedCabin ? "Change cabin" : "Select cabin"}
            </Button>
          </div>
        </FormRow>

        {/* Dates */}
        <FormRow label="Start date" error={errors.startDate?.message}>
          <Input
            type="date"
            id="startDate"
            {...register("startDate", { required: "Start date is required" })}
          />
        </FormRow>

        <FormRow label="End date" error={errors.endDate?.message}>
          <Input
            type="date"
            id="endDate"
            {...register("endDate", {
              required: "End date is required",
              validate: (val) =>
                !startDate ||
                differenceInDays(parseISO(val), parseISO(startDate)) > 0
                  ? true
                  : "End date must be after start date",
            })}
          />
        </FormRow>

        {numNights > 0 && (
          <FormRow label="Duration">
            <span className="font-['Sono'] font-medium text-grey-700">
              {numNights} night{numNights !== 1 ? "s" : ""}
            </span>
          </FormRow>
        )}

        {/* Number of guests */}
        <FormRow label="Number of guests" error={errors.numGuests?.message}>
          <Input
            type="number"
            id="numGuests"
            min={1}
            {...register("numGuests", {
              required: "Number of guests is required",
              min: { value: 1, message: "At least 1 guest required" },
              validate: (val) =>
                !selectedCabin ||
                Number(val) <= selectedCabin.maxCapacity
                  ? true
                  : `Max capacity for this cabin is ${selectedCabin.maxCapacity}`,
            })}
          />
        </FormRow>

        {/* Breakfast */}
        <FormRow label="Breakfast">
          <Controller
            name="hasBreakfast"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Checkbox
                id="hasBreakfast"
                checked={value}
                onChange={(e) => onChange(e.target.checked)}
              >
                Include breakfast
                {settings?.breakfastPrice
                  ? ` (${formatCurrency(settings.breakfastPrice)}/night per guest)`
                  : ""}
              </Checkbox>
            )}
          />
        </FormRow>

        {/* Observations */}
        <FormRow label="Observations" error={errors.observations?.message}>
          <Textarea
            id="observations"
            placeholder="Any special requests or notes..."
            {...register("observations")}
          />
        </FormRow>

        {/* Price breakdown */}
        {selectedCabin && numNights > 0 && (
          <FormRow label="Price breakdown">
            <div className="flex flex-col gap-[0.4rem] font-['Sono'] text-[1.4rem]">
              <span className="text-grey-600">
                Cabin: {formatCurrency(cabinPrice)}
              </span>
              {hasBreakfast && (
                <span className="text-grey-600">
                  Breakfast: {formatCurrency(extrasPrice)}
                </span>
              )}
              <span className="font-semibold text-[1.6rem] text-grey-800 border-t border-grey-200 pt-[0.4rem] mt-[0.2rem]">
                Total: {formatCurrency(totalPrice)}
              </span>
            </div>
          </FormRow>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-[1.2rem] py-[1.2rem] last:pb-0">
          <Button
            variation="secondary"
            type="button"
            onClick={() => {
              reset();
              onCloseModal();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            onClick={() => setSubmitAttempted(true)}
          >
            {isPending ? (
              <SpinnerMini />
            ) : isEditMode ? (
              "Update booking"
            ) : (
              "Create booking"
            )}
          </Button>
        </div>
      </Form>

      {/* Guest selection modal */}
      {showGuestsModal && (
        <Modal
          title="Select a guest"
          onClose={() => setShowGuestsModal(false)}
        >
          <GuestsModal
            onSelect={setSelectedGuest}
            onClose={() => setShowGuestsModal(false)}
          />
        </Modal>
      )}

      {/* Cabin selection modal */}
      {showCabinsModal && (
        <Modal
          title="Select a cabin"
          onClose={() => setShowCabinsModal(false)}
        >
          <CabinsModal
            onSelect={setSelectedCabin}
            onClose={() => setShowCabinsModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

