import moment from "moment";

const countAge = (tanggal) => {
  const dateA = moment();
  const dateB = moment(tanggal);
  const resDate = dateA.diff(dateB, 'days');
  const year = resDate / 365;
  return parseInt(year);
};

export const handleIndividuValidation = async (formData, currentStep, mode) => {
  let err = '';
  let tglLahirCurrentStep = '';
  if (formData.data_nik[currentStep].tgl_lahir) {
    const dateParts = formData.data_nik[currentStep].tgl_lahir.split('-');
    tglLahirCurrentStep = new Date(
      +dateParts[2],
      +dateParts[1] - 1,
      +dateParts[0],
    );
  }

  if (
    !formData.data_nik[currentStep].sts_pekerjaan &&
    formData.data_nik[currentStep].jenis_pekerjaan !== 0 &&
    formData.data_nik[currentStep].jenis_pekerjaan !== 1 &&
    formData.data_nik[currentStep].jenis_pekerjaan !== 10
  ) {
    err = 'Status pekerjaan wajib diisi';
  }

  if (!formData.data_nik[currentStep].jenis_pekerjaan) {
    err = 'Jenis pekerjaan wajib diisi';
  } else if (
    formData.data_nik[currentStep].jenis_pekerjaan !== 1 &&
    tglLahirCurrentStep &&
    countAge(tglLahirCurrentStep) < 6
  ) {
    err = 'Individu dengan status bekerja tidak boleh berusia < 5 tahun';
  }

  if (!formData.data_nik[currentStep].jns_asuransi) {
    err = 'Kepesertaan JKN wajib diisi';
  }

  if (!formData.data_nik[currentStep].jns_pendidikan) {
    err = 'Pendidikan wajib diisi';
  } else if (
    tglLahirCurrentStep &&
    countAge(tglLahirCurrentStep) <= 7 &&
    [4, 5, 6, 7, 8, 9, 10].includes(
      formData.data_nik[currentStep].jns_pendidikan,
    )
  ) {
    err =
      'Individu berusia <= 7 tahun hanya boleh mengisi kode pendidikan 1 atau 2 atau 3';
  }

  if ([2, 3, 4].includes(formData.data_nik[currentStep].sts_kawin)) {
    if (!formData.data_nik[currentStep].usia_kawin) {
      err = 'Usia kawin pertama wajib diisi';
    } else if (parseInt(formData.data_nik[currentStep].usia_kawin) < 7) {
      err = 'Usia kawin pertama tidak boleh diisi < 7 tahun';
    } else if (
      tglLahirCurrentStep &&
      parseInt(formData.data_nik[currentStep].usia_kawin) >
        Math.ceil(countAge(tglLahirCurrentStep))
    ) {
      err = 'Usia kawin pertama tidak boleh lebih besar dari umur';
    }
  }

  if (
    !formData.data_nik[currentStep].sts_kawin ||
    formData.data_nik[currentStep].sts_kawin === '' ||
    formData.data_nik[currentStep].sts_kawin === null ||
    formData.data_nik[currentStep].sts_kawin === undefined
  ) {
    err = 'Status perkawinan wajib diisi';
  } else if (
    (mode === 'Edit' && !formData.data_nik[currentStep].sts_kawin) ||
    (mode === 'Edit' &&
      currentStep === 0 &&
      formData.data_nik[currentStep].sts_kawin === 2 &&
      formData.data_nik[currentStep].jenis_kelamin === '2' &&
      formData.data_nik[currentStep].sts_hubungan === 1)
  ) {
    err = 'Istri sebagai kepala keluarga tidak boleh berstatus kawin';
  } else if (
    formData.data_nik[currentStep].sts_hubungan === 2 &&
    formData.data_nik[currentStep].sts_kawin !== 2
  ) {
    err = 'Istri harus berstatus kawin';
  } else if (
    formData.data_nik[currentStep].sts_hubungan === 3 &&
    formData.data_nik[currentStep].sts_kawin === 2
  ) {
    err = 'Anak tidak boleh berstatus kawin';
  } else if (
    formData.data_nik[currentStep].sts_hubungan === 4 &&
    formData.data_nik[currentStep].sts_kawin === 2
  ) {
    err = 'Anggota keluarga lainnya tidak boleh berstatus kawin';
  } else if (
    formData.data_nik[currentStep].sts_kawin !== 1 &&
    tglLahirCurrentStep &&
    countAge(tglLahirCurrentStep) < 6
  ) {
    err = 'Status kawin, cerai hidup/mati tidak boleh berusia < 5 tahun';
  }

  if (!formData.data_nik[currentStep].tgl_lahir) {
    err = 'Tanggal Lahir wajib diisi';
  } else if (
    formData.data_nik[currentStep].sts_hubungan === 1 &&
    countAge(tglLahirCurrentStep) < 6
  ) {
    err = 'Umur kepala keluarga tidak boleh < 5 Tahun';
  }

  if (!formData.data_nik[currentStep].sts_akta) {
    err = 'Status akta lahir wajib diisi';
  }

  if (formData.data_nik[currentStep].sts_hubungan === 3) {
    if (
      !formData.data_nik[currentStep].kd_ibukandung &&
      formData.data_nik[1].jenis_kelamin !== '1'
    ) {
      err = 'Kode Ibu Kandung wajib diisi';
    } else {
      const cekIstri = Object.values(formData.data_nik).find(
        (kel) =>
          kel.no_urutnik === formData.data_nik[currentStep].kd_ibukandung,
      );
      if (
        cekIstri &&
        [1, 3, 4].includes(cekIstri.sts_hubungan) &&
        cekIstri.jenis_kelamin === '1'
      ) {
        err = 'Kode ibu kandung harus istri dari kepala keluarga';
      } else if (
        cekIstri &&
        [3, 4].includes(cekIstri.sts_hubungan) &&
        cekIstri.jenis_kelamin === '2'
      ) {
        err = 'Kode ibu kandung harus istri dari kepala keluarga';
      }
    }
  }

  if (!formData.data_nik[currentStep].jenis_kelamin) {
    err = 'Jenis kelamin wajib diisi';
  } else if (
    formData.data_nik[currentStep].jenis_kelamin !== '2' &&
    formData.data_nik[currentStep].sts_hubungan === '2'
  ) {
    err = 'Istri harus berjenis kelamin perempuan';
  }

  if (!formData.data_nik[currentStep].sts_hubungan) {
    err = 'Hubungan dengan kepala keluarga wajib diisi';
  } else if (formData.data_nik[currentStep].sts_hubungan === 1) {
    const cekKepalaKeluarga = Object.values(formData.data_nik).find(
      (kel) => kel.sts_hubungan === 1,
    );
    if (
      cekKepalaKeluarga &&
      cekKepalaKeluarga.no_urutnik !== formData.data_nik[currentStep].no_urutnik
    ) {
      err = 'Hanya boleh ada satu Kepala Keluarga';
    }
  } else if (formData.data_nik[currentStep].sts_hubungan === 2) {
    const cekIstri = Object.values(formData.data_nik).find(
      (kel) => kel.sts_hubungan === 2,
    );
    if (
      cekIstri &&
      cekIstri.no_urutnik !== formData.data_nik[currentStep].no_urutnik
    ) {
      err = 'Hanya boleh ada satu Istri';
    }
  }

  let cekFind = 0;
  if (Object.keys(formData.data_nik).length > 1) {
    for (let i = 0; i < Object.keys(formData.data_nik).length; i++) {
      if (
        formData.data_nik[i].nik === formData.data_nik[currentStep].nik &&
        formData.data_nik[i].no_urutnik !== currentStep + 1 &&
        formData.data_nik[i].nik !== '9999999999999999'
      ) {
        cekFind++;
      }
    }
  }
  if (cekFind > 0) {
    err = 'NIK tidak boleh sama';
  }

  if (!formData.data_nik[currentStep].nik) {
    err = 'NIK wajib diisi';
  } else if (formData.data_nik[currentStep].nik.length !== 16) {
    err = 'NIK harus 16 digit';
  } else if (formData.data_nik[currentStep].nik === '0000000000000000') {
    err = 'NIK tidak boleh 0 16x';
  } else if (formData.data_nik[currentStep].nik === '1111111111111111') {
    err = 'NIK tidak boleh 1 16x';
  } else if (formData.data_nik[currentStep].nik === '2222222222222222') {
    err = 'NIK tidak boleh 2 16x';
  } else if (formData.data_nik[currentStep].nik === '3333333333333333') {
    err = 'NIK tidak boleh 3 16x';
  } else if (formData.data_nik[currentStep].nik === '4444444444444444') {
    err = 'NIK tidak boleh 4 16x';
  } else if (formData.data_nik[currentStep].nik === '5555555555555555') {
    err = 'NIK tidak boleh 5 16x';
  } else if (formData.data_nik[currentStep].nik === '6666666666666666') {
    err = 'NIK tidak boleh 6 16x';
  } else if (formData.data_nik[currentStep].nik === '7777777777777777') {
    err = 'NIK tidak boleh 7 16x';
  } else if (formData.data_nik[currentStep].nik === '8888888888888888') {
    err = 'NIK tidak boleh 8 16x';
  }

  if (!formData.data_nik[currentStep].nama_anggotakel) {
    err = 'Nama lengkap wajib diisi';
  } else if (
    !formData.data_nik[currentStep].nama_anggotakel.match(/^[a-zA-Z\.\,\'\ ]+$/)
  ) {
    err = 'Nama tidak boleh mengandung Angka & Symbol';
  }

  return err;
};
