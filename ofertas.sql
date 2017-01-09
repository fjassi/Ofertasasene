-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-01-2017 a las 20:06:01
-- Versión del servidor: 5.7.9
-- Versión de PHP: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ofertas`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comercios`
--

DROP TABLE IF EXISTS `comercios`;
CREATE TABLE IF NOT EXISTS `comercios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` char(25) NOT NULL,
  `path_logo` char(100) NOT NULL,
  `path_banner` char(100) NOT NULL,
  `id_rubro_fk` tinyint(4) NOT NULL,
  `direccion` char(50) DEFAULT NULL,
  `telefono` char(15) DEFAULT NULL,
  `link` char(20) DEFAULT NULL,
  `posicion` char(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `comercios`
--

INSERT INTO `comercios` (`id`, `nombre`, `path_logo`, `path_banner`, `id_rubro_fk`, `direccion`, `telefono`, `link`, `posicion`) VALUES
(1, 'comercio 12', '', '', 9, 'calle falsa 123', '0336-154314687', 'www.link.com.ar', '1'),
(3, 'comercio 2', '', '', 1, 'asdasdas', 'dasdasdas', 'dasdasd', 'as');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ofertas`
--

DROP TABLE IF EXISTS `ofertas`;
CREATE TABLE IF NOT EXISTS `ofertas` (
  `id` int(11) NOT NULL,
  `path_imagen` char(100) NOT NULL,
  `precio` char(10) NOT NULL,
  `id_comercio_fk` int(11) NOT NULL,
  `texto` char(20) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rubros`
--

DROP TABLE IF EXISTS `rubros`;
CREATE TABLE IF NOT EXISTS `rubros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` char(25) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `rubros`
--

INSERT INTO `rubros` (`id`, `nombre`, `activo`) VALUES
(1, 'rubro 1', 1),
(11, 'rubro 41', 1),
(10, 'rubro 3', 1),
(9, 'rubro 2', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `secr`
--

DROP TABLE IF EXISTS `secr`;
CREATE TABLE IF NOT EXISTS `secr` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` char(20) NOT NULL,
  `password` char(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `secr`
--

INSERT INTO `secr` (`id`, `nombre`, `password`) VALUES
(1, 'admin', 'admin');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
