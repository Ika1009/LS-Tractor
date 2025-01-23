<?php
// Include database connection file
include('db_connect.php'); 

// Assuming you pass the product ID through a GET parameter
$productId = intval($_GET['id']); 

// SQL query to fetch product details and images
$query = "SELECT proizvodi.*, slike.url_slike 
          FROM proizvodi 
          LEFT JOIN slike ON proizvodi.id_proizvoda = slike.id_proizvoda 
          WHERE proizvodi.id_proizvoda = ?";

$stmt = $conn->prepare($query);
$stmt->bind_param("i", $productId);
$stmt->execute();
$result = $stmt->get_result();

$product = [];
$images = [];

while ($row = $result->fetch_assoc()) {
    if (empty($product)) {
        // Store product details once
        $product = [
            'title' => $row['naziv'],
            'price' => $row['cena_bez_popusta'],
            'discounted_price' => $row['cena_sa_popustom'],
            'short_description' => $row['kratki_opis'],
            'description' => $row['opis'],
            'dimensions' => $row['spec1'],
            'color' => $row['spec2'],
            'material' => $row['spec3'],
        ];
    }
    // Store each image
    $images[] = $row['url_slike'];
}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="keywords" content="ecommerce, market, shop, mart, cart, deal, multipurpose, marketplace">
    <meta name="description" content="<?php echo $product['title']; ?> - Tvoj luksuz">
    <meta name="author" content="milosmitrovic20">
    <title><?php echo $product['title']; ?> - Tvoj luksuz</title>

    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/img/logo/favicon.png">

    <!-- Icon CSS -->
    <link rel="stylesheet" href="assets/css/vendor/materialdesignicons.min.css">
    <link rel="stylesheet" href="assets/css/vendor/remixicon.css">

    <!-- Vendor -->
    <link rel="stylesheet" href="assets/css/vendor/animate.css">
    <link rel="stylesheet" href="assets/css/vendor/aos.min.css">
    <link rel="stylesheet" href="assets/css/vendor/range-slider.css">
    <link rel="stylesheet" href="assets/css/vendor/swiper-bundle.min.css">
    <link rel="stylesheet" href="assets/css/vendor/jquery.slick.css">
    <link rel="stylesheet" href="assets/css/vendor/slick-theme.css">

    <!-- Tailwind CSS -->
    <script src="assets/js/vendor/tailwindcss3.4.5.js"></script>

    <!-- Main CSS -->
    <link rel="stylesheet" href="assets/css/style.css">

</head>

<body class="body-bg-6">

    <!-- Loader -->
    <div id="cr-overlay" class="w-full h-full fixed top-[0] right-[0] left-[0] bottom-[0] bg-[#fff] flex items-center justify-center z-[99]">
        <span class="loader w-[10px] h-[10px] rounded-[50%] inline-block relative text-[#64b496] left-[-100px]"></span>
    </div>

    <!-- Header -->
    <header class="h-[142px] max-[991px]:h-[133px] max-[575px]:h-[173px] bg-[#fff] border-b-[1px] border-solid border-[#e9e9e9]">
        <div class="flex flex-wrap justify-between relative items-center mx-auto min-[1600px]:max-w-[1500px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
            <div class="flex flex-wrap w-full">
                <div class="w-full px-[12px]">
                    <div class="top-header py-[20px] flex flex-row gap-[10px] justify-between border-b-[1px] border-solid border-[#e9e9e9] relative z-[4] max-[575px]:py-[15px] max-[575px]:block">
                        <a href="index.html" class="cr-logo max-[575px]:mb-[15px] max-[575px]:flex max-[575px]:justify-center">
                            <img src="assets/img/logo/logo.png" alt="logo" class="logo block h-[35px] max-[575px]:w-[100px]">
                        </a>
                        <form class="cr-search relative max-[575px]:max-w-[350px] max-[575px]:m-auto" action="shop-full-width.php" method="get">
                            <input class="search-input w-[600px] h-[45px] pl-[15px] pr-[175px] border-[1px] border-solid border-[#64b496] rounded-[5px] outline-[0] max-[1399px]:w-[400px] max-[991px]:max-w-[350px] max-[575px]:w-full max-[420px]:pr-[45px]" type="text" name="query" placeholder="Pretraži sajt">
                            <a href="javascript:void(0)" class="search-btn w-[45px] bg-[#64b496] absolute right-[0] top-[0] bottom-[0] rounded-r-[5px] flex items-center justify-center" id="searchButton">
                                <i class="ri-search-line text-[14px] text-[#fff]"></i>
                            </a>
                        </form>
                        <div class="cr-right-bar flex max-[991px]:hidden">
                            <a href="cart.html" class="cr-right-bar-item transition-all duration-[0.3s] ease-in-out flex items-center">
                                <i class="ri-shopping-bag-line pr-[5px] text-[21px] leading-[17px]"></i>
                                <span class="transition-all duration-[0.3s] ease-in-out font-Poppins text-[15px] leading-[15px] font-medium text-[#000]">Korpa</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="cr-fix" id="cr-main-menu-desk">
            <div class="flex flex-wrap justify-between relative items-center mx-auto min-[1600px]:max-w-[1500px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
                <div class="cr-menu-list w-full px-[12px] relative flex items-center flex-row justify-between">
                    <div class="cr-category-icon-block py-[10px] max-[991px]:hidden">
                        <div class="cr-category-menu relative">
                            <div class="cr-category-toggle w-[35px] h-[35px] border-[1px] border-solid border-[#e9e9e9] rounded-[5px] cursor-pointer flex items-center justify-center">
                                <i class="ri-menu-2-line text-[22px] text-[#2b2b2d] leading-[14px] block"></i>
                            </div>
                        </div>
                    </div>
                    <nav class="justify-between relative flex flex-wrap items-center max-[991px]:w-full max-[991px]:py-[10px]">
                        <a href="javascript:void(0)" class="navbar-toggler py-[7px] px-[14px] hidden text-[16px] leading-[1] max-[991px]:flex max-[991px]:p-[0] max-[991px]:border-[0]">
                            <i class="ri-menu-3-line max-[991px]:text-[20px]"></i>
                        </a>
                        <div class="cr-header-buttons hidden max-[991px]:flex max-[991px]:items-center">
                            <a href="cart.html" class="cr-right-bar-item transition-all duration-[0.3s] ease-in-out mr-[16px] max-[991px]:m-[0]">
                                <i class="ri-shopping-cart-line text-[20px]"></i>
                            </a>
                        </div>
                        <div class="min-[992px]:flex min-[992px]:basis-auto grow-[1] items-center hidden" id="navbarSupportedContent">
                            <ul class="navbar-nav flex min-[992px]:flex-row items-center m-auto relative z-[3] min-[992px]:flex-row max-[1199px]:mr-[-5px] max-[991px]:m-[0]">
                                <li class="nav-item relative mr-[25px] max-[1399px]:mr-[20px] max-[1199px]:mr-[30px]">
                                    <a class="nav-link font-Poppins text-[14px] font-medium block text-[#000] z-[1] flex items-center relative py-[11px] px-[8px] max-[1199px]:py-[8px] max-[1199px]:px-[0]" href="index.html">
                                        Početna
                                    </a>
                                </li>
                                <li class="nav-item relative mr-[25px] max-[1399px]:mr-[20px] max-[1199px]:mr-[30px]">
                                    <a class="nav-link font-Poppins text-[14px] font-medium block text-[#000] z-[1] flex items-center relative py-[11px] px-[8px] max-[1199px]:py-[8px] max-[1199px]:px-[0]" href="shop-full-width.php">
                                        Proizvodi
                                    </a>
                                </li>
                                <li class="nav-item relative">
                                    <a class="nav-link font-Poppins text-[14px] font-medium block text-[#000] z-[1] flex items-center relative py-[11px] px-[8px] max-[1199px]:py-[8px] max-[1199px]:px-[0]" href="contact-us.html">
                                        Kontakt
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div class="cr-calling flex justify-end items-center max-[1199px]:hidden">
                        <i class="ri-phone-line pr-[5px] text-[20px]"></i>
                        <a href="javascript:void(0)" class="text-[15px] font-medium">+381 64 8221 993</a>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Mobile menu -->
    <div class="cr-sidebar-overlay w-full h-screen hidden fixed top-[0] left-[0] bg-[#000000b3] z-[21]"></div>
    <div id="cr_mobile_menu" class="cr-side-cart cr-mobile-menu transition-all duration-[0.5s] ease h-full p-[15px] fixed top-[0] bg-[#fff] z-[22] overflow-auto w-[400px] left-[-400px] max-[575px]:w-[300px] max-[575px]:left-[-300px] max-[420px]:w-[250px] max-[420px]:left-[-250px]">
        <div class="cr-menu-title w-full mb-[10px] pb-[10px] flex flex-wrap justify-between border-b-[2px] border-solid border-[#e9e9e9]">
            <span class="menu-title text-[18px] font-semibold text-[#64b496]">Meni</span>
            <button type="button" class="cr-close relative border-[0] text-[30px] leading-[1] text-[#999] bg-[#fff]">×</button>
        </div>
        <div class="cr-menu-inner">
            <div class="cr-menu-content">
                <ul>
                    <li class="dropdown drop-list relative leading-[28px]">
                        <a href="index.html" class="dropdown-list py-[12px] block capitalize text-[15px] font-medium text-[#444] border-b-[1px] border-solid border-[#e9e9e9]">Početna</a>
                    </li>
                    <li class="dropdown drop-list relative leading-[28px]">
                        <a href="shop-full-width.php" class="dropdown-list py-[12px] block capitalize text-[15px] font-medium text-[#444] border-b-[1px] border-solid border-[#e9e9e9]">Proizvodi</a>
                    </li>
                    <li class="dropdown drop-list relative leading-[28px]">
                        <a href="contact-us.html" class="dropdown-list py-[12px] block capitalize text-[15px] font-medium text-[#444] border-b-[1px] border-solid border-[#e9e9e9]">Kontakt</a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Product -->
    <section class="section-product pt-[50px] max-[1199px]:pt-[20px]">
        <div class="flex flex-wrap justify-between relative items-center mx-auto min-[1600px]:max-w-[1500px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
            <div class="flex flex-wrap w-full mb-[-24px]" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600">
                <div class="min-[1400px]:w-[33.33%] min-[1200px]:w-[41.66%] min-[768px]:w-[50%] w-full px-[12px] mb-[24px]">
                    <div class="vehicle-detail-banner banner-content clearfix h-full">
                        <div class="banner-slider sticky top-[30px]">
                            <div class="slider slider-for mb-[15px]">
                                <?php foreach ($images as $image_url): ?>
                                    <div class="slider-banner-image">
                                        <div class="zoom-image-hover h-full flex items-center text-center border-[1px] border-solid border-[#e9e9e9] bg-[#f7f7f8] rounded-[5px] cursor-pointer">
                                            <img src="<?php echo $image_url; ?>" alt="Product Image" class="product-image w-full block m-auto">
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                            <div class="slider slider-nav thumb-image mx-[-6px]">
                                <?php foreach ($images as $image_url): ?>
                                    <div class="thumbnail-image">
                                        <div class="thumbImg mx-[6px] border-[1px] border-solid border-[#e9e9e9] rounded-[5px] flex justify-center items-center">
                                            <img src="<?php echo $image_url; ?>" alt="Thumbnail Image" class="w-full p-[2px] rounded-[5px]">
                                        </div>
                                    </div>
                                <?php endforeach; ?>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="min-[1400px]:w-[66.66%] min-[1200px]:w-[58.33%] min-[768px]:w-[50%] w-full px-[12px] mb-[24px]">
                    <div class="cr-size-and-weight-contain border-b-[1px] border-solid border-[#e9e9e9] pb-[20px] max-[767px]:mt-[24px]">
                        <h2 class="heading mb-[15px] block text-[#2b2b2d] text-[22px] leading-[1.5] font-medium max-[1399px]:text-[26px] max-[991px]:text-[20px]"><?php echo $product['title']; ?></h2>
                        <p class="mb-[0] text-[14px] font-Poppins text-[#7a7a7a] leading-[1.75] "><?php echo $product['short_description']; ?></p>
                    </div>
                    <div class="cr-size-and-weight pt-[20px]">
                        <div class="list">
                            <ul class="mt-[15px] p-[0] mb-[1rem]">
                                <li class="py-[5px] text-[#777] flex"><label class="min-w-[100px] mr-[10px] text-[#2b2b2d] font-semibold flex justify-between">Dimenzije <span>:</span></label><?php echo $product['dimensions']; ?></li>
                                <li class="py-[5px] text-[#777] flex"><label class="min-w-[100px] mr-[10px] text-[#2b2b2d] font-semibold flex justify-between">Boja<span>:</span></label><?php echo $product['color']; ?></li>
                                <li class="py-[5px] text-[#777] flex"><label class="min-w-[100px] mr-[10px] text-[#2b2b2d] font-semibold flex justify-between">Materijal <span>:</span></label><?php echo $product['material']; ?></li>
                            </ul>
                        </div>
                        <div class="cr-product-price pt-[20px]">
                            <span class="new-price font-Poppins text-[24px] font-semibold leading-[1.167] text-[#64b496] max-[767px]:text-[22px] max-[575px]:text-[20px]"><?php echo $product['discounted_price']; ?> RSD</span>
                            <span class="old-price font-Poppins text-[16px] line-through leading-[1.75] text-[#7a7a7a]"><?php echo $product['price']; ?> RSD</span>
                        </div>
                        <div class="cr-add-card flex pt-[20px]">
                            <div class="cr-qty-main h-full flex relative">
                                <input type="text" placeholder="." value="1" minlength="1" maxlength="20" class="quantity h-[40px] w-[40px] mr-[5px] text-center border-[1px] border-solid border-[#e9e9e9] rounded-[5px]">
                                <button type="button" class="plus w-[18px] h-[18px] p-[0] bg-[#fff] border-[1px] border-solid border-[#e9e9e9] rounded-[5px] leading-[0]">+</button>
                                <button type="button" class="minus w-[18px] h-[18px] p-[0] bg-[#fff] border-[1px] border-solid border-[#e9e9e9] rounded-[5px] leading-[0] absolute bottom-[0] right-[0]">-</button>
                            </div>
                            <div class="cr-add-button ml-[15px] max-[380px]:hidden">
                                <button type="button" data-id="<?php echo $productId; ?>" data-name="<?php echo $product['title']; ?>" data-price="<?php echo $product['discounted_price']; ?>" data-image="<?php echo $images[0]; ?>" class="add-to-cart cr-button cr-shopping-bag h-[40px] font-bold transition-all duration-[0.3s] ease-in-out py-[8px] px-[22px] text-[14px] font-Manrope leading-[1.2] bg-[#64b496] text-[#fff] border-[1px] border-solid border-[#64b496] rounded-[5px] flex items-center justify-center hover:bg-[#000] hover:border-[#000] max-[1199px]:py-[8px] max-[1199px]:px-[15px]">Dodaj u korpu</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-wrap w-full" data-aos="fade-up" data-aos-duration="2000" data-aos-delay="600">
                <div class="w-full px-[12px]">
                    <div class="cr-paking-delivery mt-[40px] p-[24px] bg-[#fff] border-[1px] border-solid border-[#e9e9e9] rounded-[5px]">
                        <ul class="nav nav-tabs border-b-[1px] border-solid border-[#dee2e6] flex flex-wrap justify-left" id="mydeliveryTab">
                            <li class="nav-item transition-all duration-[0.3s] ease-in-out mr-[30px] relative active">
                                <a href="#description" class="mb-[25px] flex font-Poppins text-[17px] font-semibold leading-[1.5] tracking-[0] text-[#2b2b2d] text-left max-[1399px]:text-[18px] max-[767px]:text-[16px] max-[575px]:mb-[15px]">Opis</a>
                            </li>
                        </ul>
                        <div class="tab-content" id="myTabContent">
                            <div class="tab-delivery-pane" id="description">
                                <div class="cr-tab-content">
                                    <div class="cr-description pt-[30px]">
                                        <p class="text-[14px] text-left mb-[0] font-Poppins text-[#7a7a7a] leading-[1.75]"><?php echo $product['description']; ?></p>
                                    </div>
                                    <h4 class="heading mb-[0] pt-[30px] pb-[20px] font-Poppins text-[16px] font-medium leading-[1.5] text-left text-[#2b2b2d] border-b-[1px] border-solid border-[#e9e9e9]">Pakovanje i dostava</h4>
                                    <div class="cr-description pt-[30px]">
                                        <p class="text-[14px] text-left mb-[0] font-Poppins text-[#7a7a7a] leading-[1.75]">Dostava za 2-3 radna dana. Cena dostave je 300 dinara, a za porudžbine preko 2.500 dinara dostava je besplatna.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Custom Add to Cart Popup -->
    <div id="add-to-cart-popup" class="z-[9999] fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center hidden">
        <div class="bg-white rounded-lg shadow-lg p-6 w-[300px] text-center">
            <h2 class="text-xl font-bold text-[#64b496] mb-2">Proizvod dodat!</h2>
            <p id="popup-product-name" class="text-[#444] text-[14px] mb-4"></p>
            <a href="cart.html" class="bg-[#64b496] text-white px-4 py-2 rounded hover:bg-[#000] hover:text-white transition">Idi na plaćanje</a>
            <button id="close-popup" class="text-[#64b496] mt-4 underline hover:text-[#000] transition">Nastavi kupovinu</button>
        </div>
    </div>

    <!-- Custom Popup for notifications -->
    <div id="email-popup" class="popup fixed inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.7)] z-[9999] hidden">
        <div class="popup-content bg-white p-6 rounded-[10px] shadow-lg w-[300px] text-center relative">
            <h3 id="popup-title" class="text-[20px] font-bold mb-[10px]"></h3>
            <p id="popup-message" class="text-[16px]"></p>
            <button id="close-email-popup" class="mt-[20px] py-[8px] px-[20px] bg-[#64b496] text-white rounded-[5px] hover:bg-[#000] transition-all">Zatvori</button>
        </div>
    </div>

    <!-- Footer -->
    <footer class="footer pt-[100px] max-[1199px]:pt-[70px] bg-off-white bg-[#f7f7f8] relative border-t-[1px] border-solid border-[#e9e9e9]">
        <div class="footer-container flex flex-wrap justify-between relative items-center mx-auto min-[1600px]:max-w-[1500px] min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
            <div class="flex flex-wrap w-full footer-top pb-[100px] max-[1199px]:pb-[70px]">
                <div class="min-[1200px]:w-[33.33%] min-[992px]:w-[50%] min-[576px]:w-full w-full px-[12px] cr-footer-border">
                    <div class="cr-footer-logo max-w-[400px] mb-[15px] pb-[0]">
                        <div class="image pb-[15px]">
                            <img src="assets/img/logo/logo.png" alt="logo" class="logo w-[100px] block">
                            <img src="assets/img/logo/dark-logo.png" alt="logo" class="dark-logo w-[100px] hidden">
                        </div>
                        <p class="font-Poppins text-[14px] text-[#7a7a7a] mb-[0] leading-[1.75]">Popularni proizvodi iz celog sveta kakve niste videli do sada!</p>
                    </div>
                    <div class="cr-footer">
                        <h4 class="cr-sub-title cr-title-hidden relative hidden max-[991px]:block font-Manrope text-[18px] max-[991px]:text-[15px] font-bold leading-[1.3] text-[#000] mb-[15px] max-[991px]:py-[15px] max-[991px]:mb-[0] max-[991px]:border-b-[1px] max-[991px]:border-solid max-[991px]:border-[#e9e9e9]">
                            Kontaktiraj nas
                            <span class="cr-heading-res hidden"></span>
                        </h4>
                        <ul class="cr-footer-links max-[991px]:hidden cr-footer-dropdown max-[1199px]:max-w-[500px] max-[991px]:mt-[24px]">
                            <li class="mail-icon mb-[12px] font-Poppins text-[14px] leading-[26px] text-[#777] relative pl-[30px] max-[1399px]:mt-[20px] max-[991px]:mt-[15px]">
                                <a href="javascript:void(0)" class="transition-all duration-[0.3s] ease-in-out relative font-Poppins text-[14px] leading-[26px] text-[#777] hover:text-[#64b496]">prodaja@tvojluksuz.rs</a>
                            </li>
                            <li class="phone-icon font-Poppins text-[14px] leading-[26px] text-[#777] relative pl-[30px] mb-[0] max-[1399px]:mt-[20px] max-[991px]:mt-[15px]">
                                <a href="javascript:void(0)" class="transition-all duration-[0.3s] ease-in-out relative font-Poppins text-[14px] leading-[26px] text-[#777] hover:text-[#64b496]">+381 64 8221 993</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="min-[1200px]:w-[16.66%] min-[992px]:w-[25%] min-[576px]:w-full w-full px-[12px] cr-footer-border">
                    <div class="cr-footer">
                        <h4 class="cr-sub-title font-Manrope relative text-[18px] font-bold leading-[1.3] text-[#000] mb-[15px] max-[991px]:py-[15px] max-[991px]:mb-[0] max-[991px]:text-[15px] max-[991px]:border-b-[1px] max-[991px]:border-solid max-[991px]:border-[#e9e9e9]">
                            Ostale stranice
                            <span class="cr-heading-res hidden"></span>
                        </h4>
                        <ul class="cr-footer-links max-[991px]:hidden cr-footer-dropdown max-[991px]:mt-[24px]">
                            <li class="mb-[12px] font-Poppins text-[14px] leading-[26px] text-[#777] relative max-[991px]:my-[12px]"><a href="track-order.html" class="transition-all duration-[0.3s] ease-in-out relative font-Poppins text-[14px] leading-[26px] text-[#777] hover:text-[#64b496]">Dostava i plaćanje</a></li>
                            <li class="mb-[12px] font-Poppins text-[14px] leading-[26px] text-[#777] relative max-[991px]:my-[12px]"><a href="policy.html" class="transition-all duration-[0.3s] ease-in-out relative font-Poppins text-[14px] leading-[26px] text-[#777] hover:text-[#64b496]">Politika privatnosti</a></li>
                            <li class="mb-[12px] font-Poppins text-[14px] leading-[26px] text-[#777] relative max-[991px]:my-[12px]"><a href="terms.html" class="transition-all duration-[0.3s] ease-in-out relative font-Poppins text-[14px] leading-[26px] text-[#777] hover:text-[#64b496]">Uslovi korišćenja</a></li>
                        </ul>
                    </div>
                </div>
                <div class="min-[1200px]:w-[16.66%] min-[992px]:w-[25%] min-[576px]:w-full w-full px-[12px] cr-footer-border">
                    <div class="cr-footer">
                        <h4 class="cr-sub-title font-Manrope relative text-[18px] font-bold leading-[1.3] text-[#000] mb-[15px] max-[991px]:py-[15px] max-[991px]:mb-[0] max-[991px]:text-[15px] max-[991px]:border-b-[1px] max-[991px]:border-solid max-[991px]:border-[#e9e9e9]">
                            Stranice
                            <span class="cr-heading-res hidden"></span>
                        </h4>
                        <ul class="cr-footer-links max-[991px]:hidden cr-footer-dropdown max-[991px]:mt-[24px]">
                            <li class="mb-[12px] font-Poppins text-[14px] leading-[26px] text-[#777] relative max-[991px]:my-[12px] max-[991px]:mt-[-5px]"><a href="index.html" class="transition-all duration-[0.3s] ease-in-out relative font-Poppins text-[14px] leading-[26px] text-[#777] hover:text-[#64b496]">Početna</a></li>
                            <li class="mb-[12px] font-Poppins text-[14px] leading-[26px] text-[#777] relative max-[991px]:my-[12px]"><a href="shop-full-width.php" class="transition-all duration-[0.3s] ease-in-out relative font-Poppins text-[14px] leading-[26px] text-[#777] hover:text-[#64b496]">Proizvodi</a></li>
                            <li class="mb-[12px] font-Poppins text-[14px] leading-[26px] text-[#777] relative max-[991px]:my-[12px]"><a href="contact-us.html" class="transition-all duration-[0.3s] ease-in-out relative font-Poppins text-[14px] leading-[26px] text-[#777] hover:text-[#64b496]">Kontakt</a></li>
                        </ul>
                    </div>
                </div>
                <div class="min-[1200px]:w-[33.33%] min-[992px]:w-full w-full px-[12px] cr-footer-border">
                    <div class="cr-footer cr-newsletter max-[1199px]:mt-[50px] max-[1199px]:pt-[50px] max-[1199px]:border-t-[1px] max-[1199px]:border-solid max-[1199px]:border-[#e1dfdf] max-[991px]:mt-[0] max-[991px]:pt-[0] max-[991px]:border-[0]">
                        <h4 class="cr-sub-title font-Manrope relative text-[18px] font-bold leading-[1.3] text-[#000] mb-[15px] max-[991px]:py-[15px] max-[991px]:mb-[0] max-[991px]:text-[15px] max-[991px]:border-b-[1px] max-[991px]:border-solid max-[991px]:border-[#e9e9e9]">
                            Prijavi se na našu mejl listu
                            <span class="cr-heading-res hidden"></span>
                        </h4>
                        <div class="cr-footer-links max-[991px]:hidden cr-footer-dropdown max-[1199px]:max-w-[500px] max-[991px]:mt-[24px]">
                            <form id="emailForm" method="post" class="cr-search-footer relative">
                                <input id="email" class="search-input w-full h-[44px] py-[5px] px-[15px] border-[1px] border-solid border-[#e9e9e9] outline-[0] rounded-[5px]" type="text" placeholder="Unesi mejl adresu">
                                <a href="" class="search-btn w-[50px] absolute right-[0] top-[0] bottom-[0] flex items-center justify-center">
                                    <i class="ri-send-plane-fill text-[21px] text-[#000]"></i>
                                </a>
                            </form>
                        </div>
                        <div class="cr-social-media my-[22px] mx-[-2px] flex flex-row max-[991px]:mt-[40px] max-[991px]:mr-[0] max-[991px]:mb-[24px] max-[991px]:ml-[0] max-[991px]:flex-wrap">
                            <span class="m-[2px] font-Poppins text-[17px] font-normal leading-[1.625] text-[#000]"><a href="javascript:void(0)" class="transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] flex items-center justify-center leading-[11px] bg-[#fff] border-[1px] border-solid border-[#e1dfdf] rounded-[5px] text-[#000] hover:text-[#64b496]"><i class="ri-facebook-line"></i></a></span>
                            <span class="m-[2px] font-Poppins text-[17px] font-normal leading-[1.625] text-[#000]"><a href="javascript:void(0)" class="transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] flex items-center justify-center leading-[11px] bg-[#fff] border-[1px] border-solid border-[#e1dfdf] rounded-[5px] text-[#000] hover:text-[#64b496]"><i class="ri-twitter-x-line"></i></a></span>
                            <span class="m-[2px] font-Poppins text-[17px] font-normal leading-[1.625] text-[#000]"><a href="javascript:void(0)" class="transition-all duration-[0.3s] ease-in-out w-[35px] h-[35px] flex items-center justify-center leading-[11px] bg-[#fff] border-[1px] border-solid border-[#e1dfdf] rounded-[5px] text-[#000] hover:text-[#64b496]"><i class="ri-instagram-line"></i></a></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cr-last-footer w-full py-[20px] border-t-[1px] border-solid border-[#e9e9e9] text-center">
                <p class="font-Poppins text-[14px] text-[#000] leading-[1.2] ">&copy; <span id="copyright_year"></span> <a href="index.html" class="text-[#64b496]">Tvoj luksuz</a>, Sva prava zadržana.</p>
            </div>
        </div>
    </footer>

    <!-- Tab to top -->
    <a href="#Top" class="back-to-top result-placeholder h-[38px] w-[38px] hidden fixed right-[15px] bottom-[15px] z-[10] cursor-pointer rounded-[20px] bg-[#fff] text-[#64b496] border-[1px] border-solid border-[#64b496] text-center text-[22px] leading-[1.6] hover:transition-all hover:duration-[0.3s] hover:ease-in-out">
        <i class="ri-arrow-up-line text-[20px]"></i>
        <div class="back-to-top-wrap">
            <svg viewBox="-1 -1 102 102" class="w-[36px] h-[36px] fixed right-[16px] bottom-[16px]">
                <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" class="fill-transparent stroke-[#64b496] stroke-[5px]" />
            </svg>
        </div>
    </a>
    
    <!-- Vendor Custom -->
    <script src="assets/js/vendor/jquery-3.6.4.min.js"></script>
    <script src="assets/js/vendor/jquery.zoom.min.js"></script>
    <script src="assets/js/vendor/mixitup.min.js"></script>
    <script src="assets/js/vendor/range-slider.js"></script>
    <script src="assets/js/vendor/aos.min.js"></script>
    <script src="assets/js/vendor/swiper-bundle.min.js"></script>
    <script src="assets/js/vendor/slick.min.js"></script>

    <!-- Main Custom -->
    <script src="assets/js/main.js"></script>

    <script src="addToCart.js"></script>
    <script src="emailScript.js"></script>
    <script src="search.js"></script>
    
</body>

</html>