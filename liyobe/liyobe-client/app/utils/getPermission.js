/* eslint-disable consistent-return */
export const getPermission = (hiarachy, match, history) => {
  try {
    if (hiarachy && match) {
      return hiarachy.find(x => x.path === match).perm;
    }
    return {
      create: false,
      update: false,
      delete: false,
    };
  } catch (e) {
    history.push('/notFound');
  }
};
