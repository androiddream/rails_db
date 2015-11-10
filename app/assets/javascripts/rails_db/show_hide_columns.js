$(function(){
  $(document).foundation();

  $('body').on('click', '.settings-link', function() {
    $('.rails-db-settings').toggle();
  });

  $('body').on('click', '.column-name input', function() {
    table_name = $('h2')[0].innerHTML;
    column_name = $(this).prop('name');
    if($(this).prop('checked') == false) {
      write_column_to_cookie(table_name, column_name);
    } else {
      remove_column_from_cookie(table_name, column_name);
    }
    switch_column_visibility(column_name);
    show_all_columns_after_last_became_hidden();
  });

});

function write_column_to_cookie(table_name, column_name) {
  column_names = get_column_names_from_cookie(table_name);
  $.cookie(table_name, column_names += ', ' + column_name);
};

function remove_column_from_cookie(table_name, column_name) {
  column_names = get_column_names_from_cookie(table_name);
  $.cookie(table_name, column_names.replace(', ' + column_name, ''));
};

function get_column_names_from_cookie(table_name) {
  if($.cookie(table_name) == undefined) {
    return '';
  } else {
    return $.cookie(table_name);
  }
};

function switch_column_visibility(column_name) {
  $('th.column_' + column_name).toggle();
  $('td.column_' + column_name).toggle();
};

function show_all_columns_after_last_became_hidden() {
  if($('.column-name input:checked').length == 0) {
    $('.column-name input[type=checkbox]').each(function() {
      column_name = $(this).prop('name');
      $(this).prop("checked", true);
      remove_column_from_cookie(table_name, column_name);
      switch_column_visibility(column_name);
    });
  }
};
