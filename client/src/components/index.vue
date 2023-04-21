<template>
  <html>
 
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="">
            <img src="magnifying-glass-dollar-solid.svg" alt="Dollar Detective Logo" />
            Dollar Detective
          </a>
     
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
 
        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <a class="navbar-item">
              Home
            </a>
            <a class="navbar-item">
              History
            </a>
 
            <div class="navbar-item has-dropdown is-hoverable">
              <a class="navbar-link">
              Edit
              </a>
              <div class="navbar-dropdown">
                <a class="navbar-item">
                  Add
                </a>
                  <a class="navbar-item">
                    Change
                  </a>
                <a class="navbar-item">
                  Delete
                </a>
              </div>
            </div>
          </div>
 
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="buttons">
                <a class="button is-primary">
                  <strong>LogOut</strong>
                </a>

              </div>
            </div>
          </div>
        </div>
      </nav>
    <body>

    <section class="section">
      <div class="container">
        <h1 class="title">
          Dollar Detective
        </h1>
        <p class="subtitle">
          Welcome Back!
        </p>
        <div class="piechart"></div>
      </div>
    </section>
    </body>

  </html>
</template>


<style>
button {
  padding: 10px;
  font-size: 1em;
}

img {
  height: 300px;
  width: 50px;
}

body {
  background-color: #DBF9FC;

}

.piechart {
  margin-top: 300px;
  display: block;
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background-image: conic-gradient(pink 70deg,
          lightblue 0 235deg,
          orange 0);
}

body,
.piechart {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>