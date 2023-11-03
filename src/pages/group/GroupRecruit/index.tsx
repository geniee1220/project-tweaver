import Input from '@/components/Input';
import GroupNavSidebar from '@/components/group/recruit/GroupNavSidebar';
import GroupRegistInfo from '@/components/group/recruit/GroupRegistInfo';
import GroupRegistSchedule from '@/components/group/recruit/GroupRegistSchedule';
import { groupRegistState } from '@/state/GroupResistState';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Map } from 'react-kakao-maps-sdk';
import { useRecoilState } from 'recoil';

function GroupRecruit() {
  const [currentStep, setCurrentStep] = useState(1); // Step1 : 기본 정보, Step2 : 일정 선택
  const [groupRegist, setGroupRegist] = useRecoilState(groupRegistState);
  const [isAreaError, setIsAreaError] = useState<boolean>(false);
  const [isFormError, setIsFormError] = useState({
    groupArea: false,
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setError,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onBlur',
  });

  // 디버깅용 코드
  useEffect(() => {
    console.log(currentStep);
  }, [currentStep]);

  const handleFormStep = (step: number) => {
    setCurrentStep(step);
  };

  // 드롭다운 폼 유효성 검사
  const handleFormKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      if (groupRegist.groupArea === '')
        return setIsFormError({ ...isFormError, groupArea: true });
    }
  };

  const onSubmit = (data: any) => {
    console.log('폼 제출', data);
    console.log('드롭다운', groupRegist);
  };

  return (
    <main className="h-full flex">
      <section className="inline-flex">
        <GroupNavSidebar
          selectedStep={currentStep}
          onSelectedStep={handleFormStep}
        />
        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleFormKeyPress}>
          {currentStep === 1 ? (
            <GroupRegistInfo
              register={register}
              control={control}
              errors={errors}
              isFormError={isFormError}
            />
          ) : (
            <GroupRegistSchedule />
          )}
        </form>
      </section>
      <div className="flex w-full">
        <Map
          center={{ lat: 33.5563, lng: 126.79581 }} // 지도의 중심 좌표
          style={{ width: '100%', height: '100%' }} // 지도 크기
          level={3} // 지도 확대 레벨
        ></Map>
      </div>
    </main>
  );
}

export default GroupRecruit;
