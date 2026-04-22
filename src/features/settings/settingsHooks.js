import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useGetSettings() {
  const settingsData = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });
  return settingsData;
}

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const updateSettingMutation = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("settings updated successfully");
      queryClient.invalidateQueries(["settings"]);
    },
    onError: (error) => {
      console.error(error);
      toast.error("Unable to update settings");
    },
  });

  return updateSettingMutation;
}
