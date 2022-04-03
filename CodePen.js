const simulatedSelect = $(".simulated-select");
const wrapper = simulatedSelect.find(".simulated-select-options-wrapper");
const optionsEnd = simulatedSelect.find(".simulated-select-options-end");
const options = wrapper.find('> [role="option"]');

simulatedSelect
  .on("click", function (e) {
    const option = $(e.target);
    if (!option.is('[role="option"]')) return;

    const previousSelection = options.filter("[selected]");
    previousSelection.removeAttr("selected").attr("aria-selected", "false");
    option.attr("selected", "selected");
    option.attr("aria-selected", "true");
    optionsEnd.attr("aria-label", `You selected: ${option.text()}`);
  })
  .on("focus", function (e) {
    const isOption = $(e.target).is('[role="option"]');
    if (isOption) {
      options.attr("tabindex", "0");
    }
  })
  .on("keyup", function (e) {
    const target = $(e.target);
    const isWrapper = target.is(".simulated-select-options-wrapper");
    const isOption = target.is('[role="option"]');
    const isOptionsEnd = target.is(".simulated-select-options-end");
    if (hitEsc(e)) {
      optionsEnd.focus();
      options.attr("tabindex", "-1");
    } else if (hitArrowUp(e) && isOption) {
      const prev = $(e.target).prev();
      if (prev.length) {
        prev.focus();
      } else {
        options.get(-1).focus();
      }
      e.stopPropagation();
    } else if (hitArrowDown(e) && isOption) {
      const next = $(e.target).next();
      if (next.length) {
        next.focus();
      } else {
        options.get(0).focus();
      }
      e.stopPropagation();
    }
    const enableDropdown = hitEnter(e) || hitSpacebar(e);
    if (enableDropdown) {
      if (isWrapper || isOptionsEnd) {
        options.attr("tabindex", "0");
        const previousSelection = options.filter("[selected]");
        if (previousSelection.length) {
          previousSelection.focus();
        } else {
          options.get(0).focus();
        }
      } else if (isOption) {
        options.attr("tabindex", "-1");
        optionsEnd.focus();
      }
    }
  });

function hitEsc(event) {
  return event.key === "Escape" || event.keyCode === 27 || event.which === 27;
}

function hitEnter(event) {
  var key = event.key || event.code || event.keyCode || event.which || event;
  return key === "Enter" || key === "ENTER" || key === 13;
}

function hitSpacebar(event) {
  var key = event.key || event.code || event.keyCode || event.which || event;
  return key === " " || key === "Spacebar" || key === 32;
}

function hitArrowUp(event) {
  return event.key === "ArrowUp";
}

function hitArrowDown(event) {
  return event.key === "ArrowDown";
}

///////

$("*").on("focus", function () {
  const focusedElement = document.activeElement;
  const tag = focusedElement.tagName;
  const classList = [...focusedElement.classList];
  const classString = classList.length ? "." + classList.join(".") : "";
  $("#activeElement").text(`Focused: ${tag}${classString}`);
});
