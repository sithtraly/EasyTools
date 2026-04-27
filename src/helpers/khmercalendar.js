const KhmerCalendars = (function () {
  const result = (function (t) {
    var a = {};

    function e(r) {
      if (a[r]) return a[r].exports;
      var n = a[r] = {
        i: r,
        l: !1,
        exports: {}
      };
      return t[r].call(n.exports, n, n.exports, e), n.l = !0, n.exports
    }
    return e.m = t, e.c = a, e.d = function (t, a, r) {
      e.o(t, a) || Object.defineProperty(t, a, {
        enumerable: !0,
        get: r
      })
    }, e.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, {
          value: "Module"
        }), Object.defineProperty(t, "__esModule", {
          value: !0
        })
    }, e.t = function (t, a) {
      if (1 & a && (t = e(t)), 8 & a) return t;
      if (4 & a &&
        "object" == typeof t && t && t.__esModule) return t;
      var r = Object.create(null);
      if (e.r(r), Object.defineProperty(r, "default", {
        enumerable: !0,
        value: t
      }), 2 & a &&
        "string" != typeof t)
        for (var n in t) e.d(r, n, function (a) {
          return t[a]
        }.bind(null, n));
      return r
    }, e.n = function (t) {
      var a = t &&
        t.__esModule ? function () {
          return t.default
        } : function () {
          return t
        };
      return e.d(a, "a", a), a
    }, e.o = function (t, a) {
      return Object.prototype.hasOwnProperty.call(t, a)
    }, e.p = "", e(e.s = 5)
  }([function (t, a, e) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
      value: !0
    });
    var r = e(1),
      n = e(2),
      i = function () {
        function t(t) {
          this.year = t, this.aharkun = Math.abs(292207 * this.year + 373) % 800
          this.kromathupul = 800 - this.aharkun
          this.harkun = Math.abs(Math.floor((292207 * this.year + 373) / 800)) + 1
          this.avarman = (11 * this.harkun + 650) % 692
          this.bodethey = (this.harkun + Math.floor((11 * this.harkun + 650) / 692)) % 30
        }
        return t.prototype.getLeap = function () {
          return new r.LeapUtils(this.year)
        }, t.prototype.getLerngSakDay = function () {
          var t = new r.LeapUtils(this.year - 1),
            a = 0;
          return !t.isYearLeap || t.isYearLeap &&
            !t.isMonthLeap ? (a = 0, this.bodethey < 6 &&
              (a = 1)) : t.isYearLeap &&
              t.isMonthLeap &&
            (a = 1), this.bodethey + a
        }, t.prototype.getLerngSakWeekday = function () {
          return this.harkun % 7
        }, t.prototype.getLerngSak = function () {
          var t = this.getLerngSakDay();
          return t >= 6 &&
            t <= 29 ? {
            monthId: 4,
            day: t > 15 ? t - 15 : t,
            isWax: t <= 15
          } : {
            monthId: 5,
            day: t,
            isWax: !0
          }
        }, t.prototype.getSak = function () {
          return n.Constants.sakCycle
        }, t.prototype.getZodiac = function () {
          return n.Constants.animalYears
        }, t.prototype.getLunarDate = function () {
          return n.Constants.lunarWeekdays
        }, t.prototype.getSolarMonth = function () {
          return n.Constants.months
        }, t.prototype.getLunarMonth = function () {
          var t = this;
          return [{
            id: 0,
            days: 29,
            name: "មិគសិរ"
          }, {
            id: 1,
            days: 30,
            name: "បុស្ស"
          }, {
            id: 2,
            days: 29,
            name: "មាឃ"
          }, {
            id: 3,
            days: 30,
            name: "ផល្គុន"
          }, {
            id: 4,
            days: 29,
            name: "ចេត្រ"
          }, {
            id: 5,
            days: 30,
            name: "ពិសាខ"
          }, {
            id: 6,
            days: this.getLeap().getGreatLeap() ? 30 : 29,
            name: "ជេស្ឋ"
          }, {
            id: 7,
            days: 30,
            name: "អាសាឍ"
          }, {
            id: 8,
            days: 30,
            name: "បឋមសាឍ"
          }, {
            id: 9,
            days: 30,
            name: "ទុតិយសាឍ"
          }, {
            id: 10,
            days: 29,
            name: "ស្រាពណ៍"
          }, {
            id: 11,
            days: 30,
            name: "ភទ្របទ"
          }, {
            id: 12,
            days: 29,
            name: "អស្សុជ"
          }, {
            id: 13,
            days: 30,
            name: "កត្ដិក"
          }].filter(function (a, e) {
            return t.getLeap().isYearLeap ? 7 !== a.id : 8 !== a.id &&
              9 !== a.id
          })
        }, t.prototype.toKhmerNumber = function (t) {
          return t <
            10 ? 0 == t ? "០" : 1 == t ? "១" : 2 == t ? "២" : 3 == t ? "៣" : 4 == t ? "៤" : 5 == t ? "៥" : 6 == t ? "៦" : 7 == t ? "៧" : 8 == t ? "៨" : "៩" : this.toKhmerNumber(Math.floor(t / 10)) + this.toKhmerNumber(t % 10)
        }, t
      }();
    a.LunarUtils = i
  }, function (t, a, e) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
      value: !0
    });
    var r = e(0),
      n = e(3),
      i = function () {
        function t(t) {
          if (this.year = t, this.currentLunar = new r.LunarUtils(t), this.nextLunar = new r.LunarUtils(t + 1), this.previousLunar = new r.LunarUtils(t - 1), this.isYearLeap = (this.currentLunar.bodethey > 24 || this.currentLunar.bodethey < 6 || 24 === this.currentLunar.bodethey && 6 === this.nextLunar.bodethey) && !(25 === this.currentLunar.bodethey && 5 === this.nextLunar.bodethey), this.isSolarLeap = this.currentLunar.kromathupul <= 207, this.isMonthLeap = this.isSolarLeap && this.currentLunar.avarman < 127, this.isSolarLeap || (137 === this.currentLunar.avarman && 0 === this.nextLunar.avarman ? this.isMonthLeap = !1 : this.currentLunar.avarman < 138 &&
            (this.isMonthLeap = !0)), !this.isMonthLeap) {
            var a = this.previousLunar.getLeap();
            this.isMonthLeap = a.isMonthLeap &&
              a.isYearLeap
          }
        }
        return t.getTypesOfYears = function (a, e) {
          var r = {
            normal: 0,
            monthLeap: 0,
            yearLeap: 0
          };
          if (typeof e != Date) e = new Date(e)
          if (a.getFullYear() >= e.getFullYear()) {
            for (var i = e.getFullYear(); i < a.getFullYear() + 1; i++) {
              (s = new t(n.DateUtils.ceToLunarYear(i))).isYearLeap ? r.yearLeap++ : s.getGreatLeap() ? r.monthLeap++ : r.normal++
            }
            return r
          }
          for (i = a.getFullYear() + 1; i < e.getFullYear(); i++) {
            var s;
            (s = new t(n.DateUtils.ceToLunarYear(i))).isYearLeap ? r.yearLeap++ : s.getGreatLeap() ? r.monthLeap++ : r.normal++
          }
          return r
        }, t.prototype.getTotalDays = function () {
          return this.isYearLeap ? 384 : this.getGreatLeap() ? 355 : 354
        }, t.prototype.getGreatLeap = function () {
          return (!this.isYearLeap || !this.isMonthLeap) &&
            this.isMonthLeap
        }, t
      }();
    a.LeapUtils = i
  }, function (t, a, e) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
      value: !0
    });
    var r = function () {
      function t() { }
      return t.StartingDate = new Date("1970/11/29 00:00:00"), t.lunarWeekdays = "អាទិត្យ_ចន្ទ_អង្គារ_ពុធ_ព្រហស្បតិ៍_សុក្រ_សៅរ៍".split("_"), t.animalYears = "ជូត_ឆ្លូវ_ខាល_ថោះ_រោង_ម្សាញ់_មមី_មមែ_វក_រការ_ច_កុរ".split("_"), t.sakCycle = "ឯក_ទោ_ត្រី_ចត្វា_បញ្ច_ឆ_សប្ត_អដ្ឋ_នព្វ_សំរឹទ្ធិ".split("_").map(function (t) {
        return t + "ស័ក"
      }), t.months = "មករា_កុម្ភៈ_មីនា_មេសា_ឧសភា_មិថុនា_កក្កដា_សីហា_កញ្ញា_តុលា_វិច្ឆិកា_ធ្នូ".split("_"), t
    }();
    a.Constants = r
  }, function (t, a, e) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
      value: !0
    });
    var r = function () {
      function t() { }
      return t.getDaysRange = function (t, a) {
        if (typeof a != Date) a = new Date(a)
        return Math.abs(Math.floor((a.getTime() - t.getTime()) / 864e5))
      }, t.ceToLunarYear = function (t) {
        return t - 638
      }, t.lunarToCE = function (t) {
        return t + 638
      }, t
    }();
    a.DateUtils = r
  }, function (t, a, e) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
      value: !0
    });
    var r = e(0),
      n = e(2),
      i = e(1),
      s = function () {
        function t(t) {
          this.year = t, this.lunarUtil = new r.LunarUtils(t), this.leapUtil = new i.LeapUtils(t), this.prevLeapUtil = new i.LeapUtils(t - 1)
        }
        return t.prototype.getNewYearDate = function () {
          var t, a = this.getNewYearLength(),
            e = this.getLerngSakDate();
          e.day >
            a - 1 ? t = {
              day: e.day - (a - 1),
              monthId: e.monthId,
              isWax: e.isWax
            } : t = {
              day: 14 + e.day + (e.isWax ? 0 : 1) - (a - 1),
              monthId: e.monthId - (e.isWax ? 1 : 0),
              isWax: !e.isWax
            };
          return t
        }, t.prototype.getLerngSakDate = function () {
          return this.lunarUtil.getLerngSak()
        }, t.prototype.getNewYearProperties = function () {
          var t, a, e, r = [362, 363, 364, 365, 366];
          this.prevLeapUtil.isSolarLeap ? r.splice(0, 1) : r.splice(r.length - 1, 1);
          for (var n = 0; n < r.length; n++) {
            var i = r[n],
              s = this.getSunInaccurate(i);
            if (0 == s.fortune && 0 == s.angsar) {
              t = n;
              var o = 24 * (60 - s.lippda);
              a = Math.floor(o / 60), e = o % 60
            }
          }
          return {
            firstIndex: t,
            hour: a,
            minute: e,
            sotinArray: r
          }
        }, t.prototype.getNewYearTime = function () {
          var t = this.getNewYearProperties();
          return {
            hour: t.hour,
            minute: t.minute
          }
        }, t.prototype.getNewYearLength = function () {
          var t = this.getNewYearProperties(),
            a = t.sotinArray,
            e = t.firstIndex;
          return a.length - e
        }, t.prototype.getWeekday = function () {
          return this.lunarUtil.harkun % 7
        }, t.prototype.getWeekdayName = function () {
          return n.Constants.lunarWeekdays[this.getWeekday()]
        }, t.prototype.getSunMediant = function (t) {
          var a = new r.LunarUtils(this.year - 1),
            e = Math.floor((a.kromathupul + 800 * t) / 24350),
            n = (a.kromathupul + 800 * t) % 24350,
            i = n % 811;
          return {
            fortune: e,
            angsar: Math.floor(n / 811),
            lippda: Math.floor(i / 14) - 3
          }
        }, t.prototype.simplifyMediant = function (t) {
          var a = t;
          return a.lippda >= 60 &&
            (a.lippda -= 60, a.angsar++), a.angsar >= 30 &&
            (a.angsar -= 30, a.fortune++), a.fortune >= 12 &&
            (a.fortune -= 12), t
        }, t.prototype.getSunInaccurate = function (t) {
          var a = 20,
            e = 2,
            r = 0,
            n = this.getSunMediant(t);
          n.fortune <
            e &&
            (n.fortune += 12), n.angsar <
            a &&
            (n.fortune--, n.angsar += 30), n.lippda <
            r &&
            (n.angsar--, n.lippda += 60);
          var i, s = {
            fortune: n.fortune - e,
            lippda: n.lippda - r,
            angsar: n.angsar - a
          },
            o = s.fortune;
          s.fortune >= 0 &&
            s.fortune <= 2 ? i = s : s.fortune >= 3 &&
              s.fortune <= 5 ? i = {
                angsar: 0 - s.angsar,
                fortune: 6 - s.fortune,
                lippda: 0 - s.lippda
              } : s.fortune >= 6 &&
                s.fortune <= 8 ? i = {
                  angsar: s.angsar,
                  fortune: s.fortune - 6,
                  lippda: s.lippda
                } : s.fortune >= 9 &&
                s.fortune <= 11 &&
          (i = {
            fortune: 11 - s.fortune,
            angsar: 29 - s.angsar,
            lippda: 60 - s.lippda
          });
          var u, h = 2 * i.fortune + (i.angsar >= 15 ? 1 : 0);
          u = i.angsar >= 15 ? 60 * (i.angsar - 15) + i.lippda : 60 * i.angsar + i.lippda;
          var l, p = [{
            multiplication: 35,
            chaya: 0
          }, {
            multiplication: 32,
            chaya: 35
          }, {
            multiplication: 27,
            chaya: 67
          }, {
            multiplication: 22,
            chaya: 94
          }, {
            multiplication: 13,
            chaya: 116
          }, {
            multiplication: 5,
            chaya: 129
          }][h],
            y = Math.floor(u * p.multiplication / 900),
            d = (p.multiplication, 0),
            f = Math.floor((y + p.chaya) / 60),
            g = (y + p.chaya) % 60;
          return l = o <= 5 ? {
            fortune: n.fortune - d,
            angsar: n.angsar - f,
            lippda: n.lippda - g
          } : {
            fortune: n.fortune + d,
            angsar: n.angsar + f,
            lippda: n.lippda + g
          }, this.simplifyMediant(l)
        }, t
      }();
    a.NewYearUtils = s
  }, function (t, a, e) {
    "use strict";
    var r = e(6);
    t.exports = r.KhmerCalendars
  }, function (t, a, e) {
    "use strict";
    Object.defineProperty(a, "__esModule", {
      value: !0
    });
    var r = e(3),
      n = e(0),
      i = e(2),
      s = e(1),
      o = e(4),
      u = function () {
        function t(t) {
          void 0 === t && (t = new Date)
          this.date = t
          t = new Date(t)
          this.lunarUtils = new n.LunarUtils(r.DateUtils.ceToLunarYear(t.getFullYear()))
          this.nextLunarUtils = new n.LunarUtils(r.DateUtils.ceToLunarYear(t.getFullYear() + 1))
          this.newYearUtils = new o.NewYearUtils(r.DateUtils.ceToLunarYear(t.getFullYear()))
          this.lunarDay = this.getLunarDate()
        }
        return t.prototype.calendars = function () {
          var t = new h;
          return t.GregorianCalendar = {
            year: this.date.getFullYear(),
            month: this.date.getMonth(),
            monthName: this.lunarUtils.getSolarMonth()[this.date.getMonth()],
            day: this.date.getDate(),
            dayName: this.lunarUtils.getLunarDate()[this.date.getDay()],
            hour: this.date.getHours(),
            minute: this.date.getMinutes(),
            second: this.date.getSeconds(),
            dateString: "ថ្ងៃ​ទី" + ("០" + this.lunarUtils.toKhmerNumber(this.date.getDate())).slice(-2) + " ខែ" + this.lunarUtils.getSolarMonth()[this.date.getMonth()] + " ឆ្នាំ" + this.lunarUtils.toKhmerNumber(this.date.getFullYear())
          }, t.BuddhistCalendar = {
            day: this.lunarDay.day,
            month: this.lunarDay.month.name,
            year: this.lunarDay.year,
            dayOfWeek: this.date.getDay(),
            dayName: this.lunarUtils.getLunarDate()[this.date.getDay()],
            moonPhase: this.khmerMoonPhase(this.lunarDay.moonPhase),
            smallEraYear: this.lunarDay.smallEraYear,
            greatEraYear: this.lunarDay.smallEraYear + 560,
            zodiac: this.lunarUtils.getZodiac()[this.getAnimalYear()],
            sak: this.lunarUtils.getSak()[this.getSak()],
            worshipDay: this.isWorshipDay(),
            koarDay: this.isKoarDay(),
            newYearDay: this.newYearUtils.getNewYearDate(),
            newYearTime: this.newYearUtils.getNewYearTime(),
            dateString: "ថ្ងៃ​" + this.lunarUtils.getLunarDate()[this.date.getDay()] + " " + ("០" + this.lunarUtils.toKhmerNumber(this.lunarDay.day)).slice(-2) + this.khmerMoonPhase(this.lunarDay.moonPhase) + " ខែ" + this.lunarDay.month.name + " ឆ្នាំ" + this.lunarUtils.getZodiac()[this.getAnimalYear()] + " " + this.lunarUtils.getSak()[this.getSak()] + " ព.ស. " + this.lunarUtils.toKhmerNumber(this.lunarDay.year)
          }, t
        }, t.prototype.moonPhase = function () {
          return this.lunarDay.moonPhase
        }, t.prototype.isWorshipDay = function () {
          return 8 === this.lunarDay.day || this.isWax() &&
            15 === this.lunarDay.day || !this.isWax() &&
            30 == this.lunarDay.month.days &&
            15 == this.lunarDay.day || !this.isWax() &&
            29 == this.lunarDay.month.days &&
            14 == this.lunarDay.day
        }, t.prototype.isKoarDay = function () {
          return this.isWax() &&
            14 == this.lunarDay.day || !this.isWax() &&
            30 == this.lunarDay.month.days &&
            14 == this.lunarDay.day || !this.isWax() &&
            29 == this.lunarDay.month.days &&
            13 == this.lunarDay.day
        }, t.prototype.isWax = function () {
          return "Wax" == this.lunarDay.moonPhase
        }, t.prototype.khmerMoonPhase = function (t) {
          return "Wax" == t ? "កើត" : "រោច"
        }, t.prototype.getMonthAndDay = function (t, a) {
          for (var e, r = t, n = 0; n < a.length; n++) {
            if (r <= a[0].days) {
              e = 0;
              break
            }
            r -= a[n].days;
            var i = a[n + 1];
            if (i && !(r > i.days)) {
              e = n + 1;
              break
            }
          }
          return {
            month: e,
            day: r
          }
        }, t.prototype.getSmallEraYear = function (t, a, e) {
          var r = this.lunarUtils.year,
            n = this.newYearUtils.getNewYearDate();
          return n.monthId >
            a ? r = this.lunarUtils.year - 1 : n.monthId == a &&
          (n.isWax &&
            "Wax" == e ? r = n.day > t ? this.lunarUtils.year - 1 : this.lunarUtils.year : n.isWax || (r = "Wane" == e ? n.day > t ? this.lunarUtils.year - 1 : this.lunarUtils.year : this.lunarUtils.year - 1)), r
        }, t.prototype.getDayOfMoonPhase = function (t) {
          return t >
            15 ? t - 15 : t
        }, t.prototype.getBuddhistEraYear = function (t) {
          return new Date(this.date).getFullYear() + (t <= 162 ? 543 : 544)
        }, t.prototype.getLunarDate = function () {
          var t, a, e, n, o, u, h = r.DateUtils.getDaysRange(i.Constants.StartingDate, this.date),
            l = s.LeapUtils.getTypesOfYears(i.Constants.StartingDate, this.date),
            p = Math.abs(h - (354 * l.normal + 355 * l.monthLeap + 384 * l.yearLeap)) + 1,
            y = this.lunarUtils.getLeap(),
            d = this.lunarUtils.getLunarMonth(),
            f = this.nextLunarUtils.getLunarMonth(),
            g = y.getTotalDays();
          p >
            g ? (n = this.nextLunarUtils.year - 1, e = d[(u = this.getMonthAndDay(p - g, f)).month], t = u.day, o = this.getMoonPhase(t), a = this.getDayOfMoonPhase(t)) : (e = d[(u = this.getMonthAndDay(p, d)).month], t = u.day, o = this.getMoonPhase(t), a = this.getDayOfMoonPhase(t), n = this.getSmallEraYear(a, e.id, o));
          return {
            day: a,
            moonPhase: o,
            month: e,
            year: this.getBuddhistEraYear(p),
            smallEraYear: n
          }
        }, t.prototype.getMoonPhase = function (t) {
          return t <= 15 ? "Wax" : "Wane"
        }, t.prototype.getSak = function () {
          return (this.lunarDay.smallEraYear % 10 + 9) % 10
        }, t.prototype.getAnimalYear = function () {
          return (this.lunarDay.smallEraYear % 12 + 10) % 12
        }, t
      }();
    a.KhmerCalendars = u;
    var h = function () {
      return function () { }
    }();
    a.KhmerCalendar = h;
    var l = e(3);
    a.DateUtils = l.DateUtils;
    var p = e(0);
    a.LunarUtils = p.LunarUtils;
    var y = e(2);
    a.Constants = y.Constants;
    var d = e(1);
    a.LeapUtils = d.LeapUtils;
    var f = e(4);
    a.NewYearUtils = f.NewYearUtils
  }]));
  return result;
})();

export default KhmerCalendars;

export function getLunarDate(date = Date.now()) {
	return new KhmerCalendars(new Date(date)).calendars().BuddhistCalendar.dateString
}
