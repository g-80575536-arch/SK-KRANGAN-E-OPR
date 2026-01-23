
export interface OPRData {
  program: string;
  anjuran: string;
  tarikh: string;
  masa: string;
  sasaran: string;
  objektif: string;
  kra: string;
  nama: string;
  jawatan: string;
  images: (string | null)[];
}

export const INITIAL_DATA: OPRData = {
  program: '',
  anjuran: '',
  tarikh: '',
  masa: '',
  sasaran: '',
  objektif: '',
  kra: '',
  nama: '',
  jawatan: '',
  images: Array(6).fill(null),
};
