export const handleKbValidation = async (formData, currentStep) => {
  let err = '';

    //validasi di Q01
    if (currentStep === 0) {
      if (
        // +formData.data_kb[0].Jawaban_H1 !==
        //   +formData.data_kb[0].answer[0].Jawaban_D1 +
        //     +formData.data_kb[0].answer[0].Jawaban_D2 ||
        +formData.data_kb[0].answer[1].Jawaban_D1 >
          +formData.data_kb[0].answer[0].Jawaban_D1 ||
        +formData.data_kb[0].answer[1].Jawaban_D2 >
          +formData.data_kb[0].answer[0].Jawaban_D2
      ) {
        err = 'Jumlah anak masih hidup menurut jenis kelamin tidak boleh lebih dari jumlah anak lahir hidup menurut jenis kelamin';
      }
      if (
        !formData.data_kb[0].answer[0].Jawaban_D1 ||
        !formData.data_kb[0].answer[0].Jawaban_D2 ||
        !formData.data_kb[0].answer[1].Jawaban_D1 ||
        !formData.data_kb[0].answer[1].Jawaban_D2
      ) {
        err = 'Data anak belum lengkap';
      }
      if (!formData.data_kb[0].Jawaban_H1) {
        err = 'Belum ada jawaban';
      }
    }

    //validasi di Q02
    if (currentStep === 1) {
      if (!formData.data_kb[1].Jawaban_H1) {
        err = 'Belum ada jawaban';
      }
    }

    //validasi di Q03
    if (currentStep === 2) {
      if (
        formData.data_kb[2].answer[0].No_Jawaban === '1' && !formData.data_kb[2].answer[0].pilihankb
      ) {
        err = 'Keinginan hamil belum dijawab';
      }
      if(currentStep === 2 && formData.data_kb[2].answer[0].Jawaban_D1 && +formData.data_kb[2].answer[0].Jawaban_D1 > 48){
        err = 'Usia kehamilan maksimal 48 minggu';
      }
      if (
        formData.data_kb[2].answer[0].No_Jawaban === '1' && !formData.data_kb[2].answer[0].Jawaban_D1
      ) {
        err = 'Usia kehamilan belum dijawab. Usia kehamilan maksimal 48 minggu';
      }
      if (
        formData.data_kb[2].answer[0].No_Jawaban === '2' &&
        !formData.data_kb[2].answer[0].pilihankb
      ) {
        err = 'Keinginan memiliki anak belum dijawab';
      }
      if (!formData.data_kb[2].answer[0].No_Jawaban) {
        err = 'Belum ada jawaban';
      }
    }

    //validasi di Q04
    if (currentStep === 3) {
      if (
        formData.data_kb[3].answer[0].No_Jawaban === '1' && !formData.data_kb[3].answer[0].Jawaban_D2
      ) {
        err = 'Tahun mulai menggunakan kontrasepsi belum dijawab';
      }
      if (
        formData.data_kb[3].answer[0].No_Jawaban === '1' && !formData.data_kb[3].answer[0].Jawaban_D1
      ) {
        err = 'Bulan mulai menggunakan kontrasepsi belum dijawab';
      }
      if (!formData.data_kb[3].answer[0].No_Jawaban) {
        err = 'Belum ada jawaban';
      }
    }

    //validasi di Q05
    if (currentStep === 4) {
      const date1 = new Date(
        +formData.data_kb[4].answer[0].Jawaban_D2,
        +formData.data_kb[4].answer[0].Jawaban_D1,
        1,
      );
      const date2 = new Date(
        +formData.data_kb[4].answer[0].Jawab_D4,
        +formData.data_kb[4].answer[0].Jawab_D3,
        1,
      );
      if (date2 < date1) {
        err = 'Bulan tahun kapan berhenti tidak boleh lebih kecil daripada bulan tahun kapan mulai';
      }
      if (
        formData.data_kb[4].answer[0].No_Jawaban === '1' &&
        (!formData.data_kb[4].answer[0].Jawaban_D1 ||
          !formData.data_kb[4].answer[0].Jawaban_D2 ||
          !formData.data_kb[4].answer[0].Jawab_D3 ||
          !formData.data_kb[4].answer[0].Jawab_D4)
      ) {
        err = 'Bulan dan tahun kapan mulai dan kapan berhenti harus dijawab';
      }
      if (!formData.data_kb[4].answer[0].No_Jawaban) {
        err = 'Belum ada jawaban';
      }
    }

    //validasi di Q06
    if (currentStep === 5) {
      if (!formData.data_kb[5].answer[0].No_Jawaban) {
        err = 'Belum ada jawaban';
      }
    }

    //validasi di Q07
    if (currentStep === 6) {
      if (!formData.data_kb[6].answer[0].No_Jawaban) {
        err = 'Belum ada jawaban';
      }
    }

    //validasi di Q08
    if (currentStep === 7) {      
      if (
        formData.data_kb[7].answer[0].No_Jawaban === '10' &&
        !formData.data_kb[7].answer[0].Lainnya
      ) {
        err = 'Keterangan harus diisi jika memilih jawaban 10. Lainnya';
      }
      if (!formData.data_kb[7].answer[0].No_Jawaban) {
        err = 'Belum ada jawaban';
      }
    }

    //validasi di Q09
    if (currentStep === 8) {
      if (!formData.data_kb[8].answer[2].pilihankb) {
        err = 'Belum ada jawaban tentang mendapatkan informasi yang harus dilakukan apabila mengalami efek samping kontrasepsi';
      }
      if (!formData.data_kb[8].answer[1].pilihankb) {
        err = 'Belum ada jawaban tentang mendapatkan informasi efek samping kontrasepsi';
      }
      if (!formData.data_kb[8].answer[0].pilihankb) {
        err = 'Belum ada jawaban tentang mendapatkan informasi jenis kontrasepsi';
      }
    }

    return err;
};
