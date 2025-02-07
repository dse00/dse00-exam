import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';

import { CMS_QUERY_KEYS } from '@/constants';
import cmsServices from '@/services/cms';
import { SettingType } from '@/types/settings';

import { useMyToast } from '../useMyToast';

export const useCmsSetting = () => {
  const queryClient = useQueryClient();
  const { successToast } = useMyToast();

  const token = Cookies.get('token') as string;

  const { data: cmsSettingData } = useQuery({
    queryKey: [CMS_QUERY_KEYS.CMS_SETTINGS],
    queryFn: () => {
      return cmsServices.getSettings();
    },
  });

  const { mutate: updateSetting } = useMutation({
    mutationFn: (dto: SettingType) => {
      return cmsServices.updateSettings(dto);
    },
    onSuccess: () => {
      invalidateSettingsQuery();
      successToast('Setting status updated successfully');
    },
  });

  const invalidateSettingsQuery = () => {
    queryClient.invalidateQueries({ queryKey: [CMS_QUERY_KEYS.CMS_SETTINGS] });
  };

  return { cmsSettingData, updateSetting };
};
