
// Responsive MENU
$(document).ready(function(){
    $('#menu-btn').click(function(){
    $('#menu').toggleClass("act");
    });
    });
// Dropdown profile
    let subMenu = document.getElementById("subMenu");
    function toggleMenu(){
      subMenu.classList.toggle("open-menu");
    }

    function themSanPham() {
      var newSp = layThongTinSanPhamTuTable('khungThemSanPham');
      if(!newSp) return;
  
      for(var p of list_products) {
          if(p.masp == newSp.masp) {
              alert('Mã sản phẩm bị trùng !!');
              return false;
          }
  
          if(p.name == newSp.name) {
              alert('Tên sản phẩm bị trùng !!');
              return false;
          }
      }
       // Them san pham vao list_products
       list_products.push(newSp);
  
       // Lưu vào localstorage
       setListProducts(list_products);
   
       // Vẽ lại table
       addTableProducts();
  
      alert('Thêm sản phẩm "' + newSp.name + '" thành công.');
      document.getElementById('khungThemSanPham').style.transform = 'scale(0)';
  }