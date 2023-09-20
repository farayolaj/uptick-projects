export async function getLoginPage(req, res) {
  res.render("login");
}

export async function getSignupPage(req, res) {
  res.render("signup");
}
